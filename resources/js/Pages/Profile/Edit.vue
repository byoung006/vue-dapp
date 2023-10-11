<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import {Head, usePage} from '@inertiajs/vue3';
import {getNftImagesFromAddress} from "@/Web3/GetNfts";
import {onBeforeMount, onMounted, ref} from "vue";
import Dropdown from "@/Components/Dropdown.vue";

// create a new ref that stores the retrieved image paths from the getNftFromAddress function

const NftImagesFromAddress = ref([]);

const user = usePage().props.auth.user;
const thisThing = import.meta.env.VITE_ALCHEMY_API_KEY;
console.log(user, 'user obj')

async function Init () {
    try {
    let cats = await getNftImagesFromAddress(user.eth_address, thisThing)
    console.log(cats, 'cats')
        return cats.flat()
    } catch (e) {
       console.log(e, 'error');
    }

}

onBeforeMount(() => {
    Init().then((res)=>{
        NftImagesFromAddress.value = res;
    })
})


defineProps({
    mustVerifyEmail: Boolean,
    status: String,
});
</script>

<template>
    <Head title="Profile" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <UpdateProfileInformationForm
                        :must-verify-email="mustVerifyEmail"
                        :status="status"
                        :profile_photo_path="NftImagesFromAddress"
                        class="max-w-xl"
                    />
                </div>

                <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <UpdatePasswordForm class="max-w-xl" />
                </div>

                <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <DeleteUserForm class="max-w-xl" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
