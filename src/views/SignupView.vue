<template>
    <form @submit.prevent="handleSumbit">
        <h3>Signup</h3>
        <input type="text" placeholder="display name" v-model="displayName">
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <div class="error">{{ error }}</div>
        <button v-if="!isPending">Login</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>

</template>

<script>
import { auth } from '@/firebase/firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref } from 'vue';

export default {
    setup() {
        const router = useRouter()
        const displayName = ref('');
        const email = ref('')
        const error = ref('')
        const password = ref('')
        const isPending = ref(false)

        const handleSumbit = async () => {
            try {
                isPending.value = true;

                await createUserWithEmailAndPassword(auth, email.value, password.value)

                await updateProfile(auth.currentUser, { displayName: displayName.value })

                router.push({ name: 'home' })
            } catch (err) {
                error.value = err.message
            } finally {
                isPending.value = false
            }
        }

        return { displayName, email, isPending, handleSumbit, password, error }

    }
}
</script>

<style></style>