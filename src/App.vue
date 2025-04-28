<template>
  <div class="container">
    <h1>🔒 Keycloak Authentication POC</h1>

    <div v-if="!keycloak.authenticated">
      <button @click="login">Sign In</button>
      <button @click="signup">Sign Up</button>
    </div>

    <div v-else>
      <p>Welcome! 🎉</p>
      <button @click="keycloak.logoutFn">Logout</button>
      <div v-if="loginUrl">
        <p><strong>Login URL:</strong></p>
        <textarea :value="loginUrl" rows="3" cols="120" readonly></textarea>
      </div>
      <div v-if="registerUrl">
        <p><strong>Register URL:</strong></p>
        <textarea :value="registerUrl" rows="3" cols="120" readonly></textarea>
      </div>
      <p><strong>User ID:</strong> {{ keycloak.subject }}</p>
      <p><strong>Refresh Token:</strong></p>
      <textarea v-model="keycloak.refreshToken" rows="6" cols="120" readonly></textarea>
      <p><strong>Access Token:</strong></p>
      <textarea v-model="keycloak.token" rows="6" cols="120" readonly></textarea>
      <p><strong>Encoded Token:</strong></p>
      <textarea :value="JSON.stringify(keycloak.tokenParsed, null, 2)" rows="10" cols="120" readonly></textarea>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useKeycloak } from '@dsb-norge/vue-keycloak-js'

export default {
  setup() {
    const keycloak = useKeycloak()
    const registerUrl = ref('')
    const loginUrl = ref('')

    const generateLoginUrl = async () => {
      const url = await keycloak.createLoginUrl();
      loginUrl.value = url;
      console.log('Login URL:', url);
    }

    const generateRegisterUrl = async () => {
      const url = await keycloak.createRegisterUrl();
      registerUrl.value = url;
      console.log('Register URL:', url);
    }
    // Use the properties/functions

    // 👀 Watch for authentication state
    watchEffect(() => {
      if (keycloak.authenticated) {
        generateRegisterUrl();
        generateLoginUrl();
      }
    });

    return {
      keycloak,
      generateLoginUrl,
      generateRegisterUrl,
      loginUrl,
      registerUrl
    }
  }
}
</script>



<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin: 5px;
  padding: 10px 20px;
}

textarea {
  margin-top: 10px;
  width: 80%;
}
</style>
