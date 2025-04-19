<template>
    <form @submit.prevent="handleSumbit">
        <h3>Login</h3>
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <div class="error">{{ error }}</div>
        <button v-if="!isPending">Login</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script>
import { auth } from '@/firebase/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter()
        const email = ref('')
        const password = ref('')
        const error = ref('')
        const isPending = ref(false)

        const handleSumbit = async () => {
            try {
                isPending.value = true
                await signInWithEmailAndPassword(auth, email.value, password.value)

                router.push({ name: 'home' })
            } catch (err) {
                error.value = err.message
            } finally {
                isPending.value = false
            }
        }

        return { email, password, handleSumbit, error, isPending }
    }
}
</script>

<style></style>