<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create new playlist</h4>
        <input type="text" v-model="title" placeholder="playlist title" required>
        <textarea placeholder="Playlist description" v-model="description"></textarea>
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ error }}</div>
        <button v-if="!isPending">Create</button>
        <div v-if="isPending" disabled>Loading...</div>
    </form>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const title = ref('')
        const description = ref('')
        const error = ref('')
        const isPending = ref(false)
        const file = ref(null)

        const handleSubmit = async () => {
            if (file.value) {
                try {
                    isPending.value = true

                    const urlPublic = '@/assets/ekaterina-bogdan-qwwURtuMF84-unsplash.jpg';

                } catch (err) {
                    error.value = err.message
                } finally {
                    isPending.value = false
                }
            }
        }


        /*
        function useStorage() {
            const urlPublic = ref(null)
            const filePath = ref(null)

            const uploadImage = async (file) => {
                //create a path
                filePath.value = `covers/${auth.currentUser.uid}/${file.name}`
                //make a firebase storage ref
                const storageRef = storage.ref(filePath.value)

                try {
                    //upload the file to that 
                    const res = await storageRef.put(file)

                    //returns the public url
                    urlPublic.value = res.ref.getDownloadURL
                } catch {
                    error.value = err.message
                }
            }
            return { url, filePath }
        }
        */
        //Design path /covers/{{ userid }}/{{ file-name }}


        const types = ['image/png', 'image/jpeg']

        const handleChange = (e) => {
            const selected = e.target.file[0]

            if (selected && types.includes(selected.types)) {
                file.value = selected
                error.value = ''
            } else {
                file.value = null
                error.value = 'Please select an image file(png or jpg)'
            }
        }

        return { handleSubmit, title, description, error, isPending, handleChange }
    }
}
</script>

<style scoped>
input[type='file'] {
    border: 0;
    padding: 0;
}

label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}

button {
    margin-top: 20px;
}
</style>