<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">Login</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-black">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://via.placeholder.com/150" />
            </figure>
            <form>
              <b-field>
                <b-input v-model="user.username" placeholder="Nombre de usuario"></b-input>
              </b-field>

              <b-field>
                <b-input
                  v-model="user.password"
                  placeholder="Contraseña"
                ></b-input>
              </b-field>
              <b-button @click="submit" type="is-info" expanded
                >Click Me</b-button
              >
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import redirect from '@/mixins/redirect'

export default {
  mixins: [redirect],
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async submit () {
      console.log(this.user)
      const data = await this.$store.dispatch('login', this.user)
      console.log(data)
      console.log(this.$store.state.isLogued)
      if (this.$store.state.isLogued) {
        this.$router.push({
          path: this.redirect || '/',
          query: this.otherQuery
        })
      }
    }
  }
}
</script>

<style scoped>
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}

.login-hr {
  border-bottom: 1px solid black;
}

.has-text-black {
  color: black;
}

.field {
  padding-bottom: 10px;
}

.fa {
  margin-left: 5px;
}
</style>
