<template>
    <div class="modal fade" id="signinModal" tabindex="-1" role="dialog" aria-labelledby="signinModal" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="signIn">Sign In</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="form-group">
                        <label>Email address</label>
                        <input type="email" v-model="login.email" class="form-control" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" v-model="login.password" class="form-control" placeholder="Password">
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                    <button type="button" v-on:click="userLogin" class="btn bg-warning" data-dismiss="modal">Sign In</button>
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
            login: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        loginUser() {
            axios.post(`${serverUrl}/users/login`, {
                email: this.login.email,
                password: this.login.password
            })
            .then(({data}) => {
            console.log(data)
            localStorage.setItem('token',data.token)
            localStorage.setItem('username',data.username)
            localStorage.setItem('email',data.email)
            this.$emit('showProfilePage','profile')
            Swal.fire({
                type: 'success',
                text: 'successfully logged in! '
            })
            })
            .catch((error) => {
            Swal.fire({
                type: 'error',
                text: 'email or password is wrong'
            })
            })
        }
    }
}
</script>

<style>

</style>
