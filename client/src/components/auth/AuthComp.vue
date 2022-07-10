<template>
    <form>
        <label v-if="isNewUser">User-Name : </label>
        <input v-if="isNewUser" type="text" v-model="name" required>

        <label>Email : </label>
        <input type="email" v-model="email" required>

        <label>Password : </label>
        <input type="password" v-model="password" required>

        <button @click="formStatus">Submit</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            isNewUser: false,
        }
    },
    methods: {
        formStatus() {
            this.$emit('submited')
        }
    }
}
</script>

<style scoped>
form {
    max-width: 420px;
    margin: 30px auto;
    background: rgb(246, 243, 243);
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}

label {
    color: rgb(199, 195, 195);
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

input {
    display: block;
    padding: 5px 5px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}

button {
    color: rgb(201, 200, 200);
    display: inline-block;
    margin: 25px 0 15px;
    padding: 10px 6px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: none;
    box-sizing: border-box;
    font-weight: bold;
}
</style>
