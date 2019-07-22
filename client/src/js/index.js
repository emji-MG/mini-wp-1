import App from '../App.vue';
import Vue from 'vue'


new Vue(App).$mount('#app');







let serverURL = `http://localhost:3000`

var app = new Vue({
    el: '#app',
    data: {
      register : {
        name : '',
        email : '',
        password : '',
      },
      login :{
        email : '',
        password : '',
      },
      article : {
        title : '',
        content : '',
      },
      articleList : []
    },
    methods : {

      fetchArticleWhenLogin(){
        axios({
          method : 'GET',
          url : `${serverURL}/articles/readAllArticle`,
        })
        .then(({data}) =>{
          this.articleList = data
          console.log(this.articleList)
        })
        .catch((err) =>{
          console.log(err)
        })
      },

      createArticle : function (){
        let title = this.article.title
        let content = this.article.content

        console.log(title, content)
        axios({
          method : 'POST',
          url : `${serverURL}/articles/createArticle`,
          data : {
            title : title,
            content : content
          }
        })
        .then(({data}) =>{
          console.log(data)
          Swal.fire('Success', 'Article has been Created!', 'success')
          // this.articleList.push(data)
        })
        .catch(err =>{
          console.log(err)
        })
      },

      readOwnArticle: function(){
        axios({
          method : 'GET',
          url : `${serverURL}/articles/readOwnArticle`,
          data : {
            // title : title,
            // content : content
          }
        })
        .then(({data})=>{
          console.log(data)
        })
        .catch(err =>{
          console.log(err)
        })
      },

      deleteArticle : function(){
        axios({
          method : 'DELETE',
          url : `${serverURL}/articles/deleteArticle`,
          data : {
            // title : title,
            // content : content
          }
        })
        .then(({data}) =>{
          console.log(data)
        })
        .catch(err =>{
          console.log(err)
        })
      },

      singleArticle : function(){
        axios({
          method : 'GET',
          url : `${serverURL}/articles/singleArticle`,
          data : {
            // title : title,
            // content : content
          }
        })
        .then(({data})=> {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
      },
      
      updateArticle : function(){
        axios({
          method : 'GET',
          url : `${serverURL}/articles/updateArticle`,
          data : {
            // title : title,
            // content : content
          }
        })
        .then(({data})=> {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
      }


    },
    watch: {
      islogin(){
        if(this.islogin){
          this.fetchArticleWhenLogin()
        }
      }

    },
    created() {
      if (localStorage.getItem('token')) {
        this.islogin = true
      } else {
        this.islogin = false
    }

    if (this.islogin) {
    this.fetchArticleWhenLogin()

    } 
  }
})