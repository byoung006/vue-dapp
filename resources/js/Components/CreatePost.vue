<template>
    <component class="mt-4">
        <div>
            <textarea
                v-model="text"
                placeholder="Enter your text here"
                rows="5"
                cols="33"
                ref="textarea"
                class="m-5 block w-3/4 p-4"
            ></textarea>

            <div v-if="!hasPhoto" class="flex items-center justify-start mt-4">
            <primary-button class="ml-4" @click="hasPhoto = !hasPhoto">Photos</primary-button>
            </div>
            </div>
    </component>
    <component v-if="hasPhoto">
    <div >
         <div class="flex items-center justify-start mt-4">
            <primary-button class="ml-4" @click="showFileSelect = !showFileSelect">Select a file</primary-button>
        </div>
        <div v-show="showFileSelect">
            <Modal :show="showFileSelect" @close="closeModal">
                <FileUpload :maxSize="5" accept="png" @file-uploaded="getUploadedData" />
            </Modal>
        </div>

        <div v-if="fileSelected">
            Successfully Selected file: {{ file.name }}.{{ file.fileExtention }}
        </div>
    </div>
    </component>
</template>

<script>
import FileUpload from "./FileUpload.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";

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
            file: {},
            fileSelected: false,
            showFileSelect: false,
            hasPhoto:false,
            text:""
        };
    },

    methods: {
        getUploadedData(file) {
            this.fileSelected = true;
            this.showFileSelect = false;
            this.file = file;
        },

        closeModal() {
            this.showFileSelect = false;
            this.fileSelected= false;
            this.hasPhoto = false;
        },

    },

};
</script>
<style>

</style>
