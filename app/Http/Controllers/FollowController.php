<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Lecturize\Followers\Models\Follower;
class FollowController extends Controller
{
    public function getUsersFollowers(Request $request)
    {
        $user = $request->user();
        $followers = Follower::where('followable_id', $user->id)->get();
        return response()->json($followers);
    }

    public function getUsersFollowersCount(Request $request)
    {
        $user = $request->user();
        $followers = Follower::where('followable_id', $user->id)->count();
        return response()->json($followers);
    }
}
