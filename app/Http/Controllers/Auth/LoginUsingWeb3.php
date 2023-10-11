<?php
namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Elliptic\EC;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use kornrunner\Keccak;

class LoginUsingWeb3
{
    /**
     * @throws ValidationException
     * @throws \Exception
     */
    public function __invoke(Request $request): \Illuminate\Http\RedirectResponse
    {
        if (! $this->authenticate($request)) {
            throw ValidationException::withMessages([
                'signature' => 'Invalid signature.'
            ]);
        }

        Auth::login(User::firstOrCreate([
            'eth_address' => $request->userPublicAddress
        ]));

        return Redirect::route('dashboard');
    }

    /**
     * @throws \Exception
     */
    protected function authenticate(Request $request): bool
    {
        return $this->verifySignature(
            $request->message,
            $request->sig,
            $request->userAddress,
        );
    }

    /**
     * @throws \Exception
     */
    protected function verifySignature($message, $signature, $address): bool
    {
        $messageLength = strlen($message);
        $hash = Keccak::hash("\x19Ethereum Signed Message:\n{$messageLength}{$message}", 256);
        $sign = [
            "r" => substr($signature, 2, 64),
            "s" => substr($signature, 66, 64)
        ];

        $recId  = ord(hex2bin(substr($signature, 130, 2))) - 27;

        if ($recId != ($recId & 1)) {
            return false;
        }

        $publicKey = (new EC('secp256k1'))->recoverPubKey($hash, $sign, $recId);

        return $this->pubKeyToAddress($publicKey) === Str::lower($address);
    }

    /**
     * @throws \Exception
     */
    protected function pubKeyToAddress($publicKey): string
    {
        return "0x" . substr(Keccak::hash(substr(hex2bin($publicKey->encode("hex")), 1), 256), 24);
    }
}
