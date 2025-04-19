<template>
    <div class="navbar">
        <nav>
            <router-link :to="{ name: 'home' }">
                <img src="@/assets/logo.png" alt="logo">
            </router-link>

            <div class="links">
                <div v-if="currentUser">
                    <button @click="handleLogout" v-if="!isPending">Logout</button>
                    <button v-if="isPending" disabled>Loading...</button>
                </div>
                <div v-else>
                    <router-link class="btn" :to="{ name: 'signup' }">signup</router-link>
                    <router-link class="btn" :to="{ name: 'login' }">login</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { auth } from '@/firebase/firebase.config'
import { signOut } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const isPending = ref(false)
        const error = ref('')
        const currentUser = ref(auth.currentUser)

        const handleLogout = async () => {
            try {
                isPending.value = true

                await signOut(auth)

                router.push({ name: 'login' })
            } catch (err) {
                error.value = err.message
            } finally {
                isPending.value = false
            }
        }

        return { handleLogout, currentUser, error, isPending }
    }
}
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}

nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

nav h1 {
    margin-left: 20px;
}

nav .links {
    margin-left: auto;
}

nav .links a,
button {
    margin-left: 16px;
    font-size: 14px;
}

nav img {
    max-height: 60px;
}
</style>