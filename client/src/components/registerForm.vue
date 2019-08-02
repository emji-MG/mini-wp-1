<template>
<!-- Modal Sign Up -->
    <div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="signupModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="signUp">Sign Up</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
            <div class="form-group">
                <label>Name</label>
                <input type="email" v-model="register.name" class="form-control" placeholder="Enter name">
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model="register.email" class="form-control" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="register.password" class="form-control" placeholder="Password">
            </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
            <button type="button" v-on:click="userRegister" class="btn bg-warning" data-dismiss="modal">Sign Up</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
    // const serverUrl = `http://localhost:3000/`
    const serverUrl = `http://34.66.247.189/`

export default {
    data() {
        return {
            register: {
                username: '',
                email: '',
                password: ''
            },
    cancelDisabled: true
        }
    },
methods: {
    registerUser() {
        axios.post(`${serverUrl}/users/register`, {
            email: this.register.email,
            username: this.register.username,
            password: this.register.password
        })
        .then(({data}) => {
        Swal.fire({
            type: 'success',
            text: `Successfully registered ${this.register.email}`
            })
        })
        .catch((error) => {
            Swal.fire({
                type: 'error',
                text: `${error.response.data.message}`
            })
        })
    },
}
}
</script>

<style>

</style>