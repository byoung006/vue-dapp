<template>
    <component class="mt-4">
        <div>
            <textarea
                v-model="post['text']"
                placeholder="Enter your text here"
                rows="5"
                cols="33"
                ref="textarea"
                class="m-5 block w-3/4 p-4"
            ></textarea>

            <div v-if="!post['hasPhoto']" class="flex items-center justify-start mt-4">
            <primary-button class="ml-4" @click="post['hasPhoto'] = !post['hasPhoto']">Photos</primary-button>
            </div>
            </div>
    </component>
    <component v-if="post['hasPhoto']">
    <div >
         <div class="flex items-center justify-start mt-4">
            <primary-button class="ml-4" @click="openModal">Select a file</primary-button>
        </div>
        <div class="mt-2" v-if='isModalVisible'>
            <Modal max-width="xl" :show="isModalVisible" :closeable="closeModal">
                <FileUpload :maxSize="5" accept="png" @file-uploaded="getUploadedData" />
            </Modal>
        </div>

        <div class="placeholder" v-if="post['fileSelected'] ">
            <div
                class="base-image-input"
                :style="{ 'background-image': `url(${imageData})` }"
            >
            </div>
        </div>
    </div>
    </component>
        <div class="mt-2 p-4">
        <primary-button v-on:click="submit">Submit</primary-button>
        </div>
        <div v-if="errors">
        <ul>
            <li v-for="error in post['errors']" class="text-red-500">{{ error }}</li>
        </ul>
        </div>
</template>

<script>
import FileUpload from "./FileUpload.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";
import {useForm} from "@inertiajs/vue3";

export default {
    name: "CreatePost",
    components: {
        Modal,
        PrimaryButton,
        FileUpload,
    },
mounted() {
        // Focus on textarea
        this.$refs.textarea.focus()
},
data() {
    return {
        post : [
            {
            file: {},
            fileSelected: false,
            showFileSelect: false,
            hasPhoto:false,
            text:"",
            errors:[]
            }
        ],
        isModalVisible: false,
        imageData: null

    };

},
watch: {
        post: function (val) {
            if (val) {
            console.log(val, 'val');
            }
        },
    },
    methods: {
        getUploadedData(file) {
            this.imageData = file.url;
            console.log(file, 'the file coming from the child')
            this.post['fileSelected'] = true;
            this.post['file'] = file;
            this.closeModal()
        },
        openModal() {
            this.isModalVisible = true;
            },
        closeModal() {
            this.showFileSelect = false;
            this.fileSelected= false;
            this.hasPhoto = false;
            return this.isModalVisible = false;
        },
        async submit () {
            const postBody ={
                text: this.post['text'],
                file: this.post['file'],
            };
            console.log(postBody, 'post to endpoint' );
           try {
               await useForm(postBody).post('/posts')
           } catch (e){
                console.log(e, 'error')
               this.post['errors'] = e;
           } finally {
               this.text = "";
               this.file = {};
               this.fileSelected = false;
               this.hasPhoto = false;
           }
        },

    },

};
</script>
<style>
.base-image-input{
    display: block;
    width: 100px;
    height: 100px;
    cursor: pointer;
    background-size: cover;
    background-position: center center;
    padding: 5%;
}
.placeholder {
    background: #F0F0F0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 18px;
}
</style>
