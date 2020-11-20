<template>
  <div id="Login">

    <aside>

      <div class="login-form">
       <h1>{{ $t("Login.titleText") }}</h1>
        <div class="cell">
          <div class="hd"></div>
          <div class="bd">
            <input
              type="text"
              class="username"
              v-model="loginForm.username"
              :placeholder="$t('Login.usernamePlaceholderText')"
              maxlength="30"
              autocomplete="false"
            >
          </div>
          <div class="ft">
            <i></i>
          </div>
        </div>

        <div class="cell">
          <div class="hd"></div>
          <div class="bd">
            <input
              type="password"
              class="password"
              v-model="loginForm.password"
              :placeholder="$t('Login.passwordPlaceholderText')"
              maxlength="30"
              autocomplete="false"
            >
          </div>
          <div class="ft">
            <i></i>
          </div>
        </div>

        <button @click="login">{{ $t("Login.buttonText") }}</button>

        <p><a href="#">MIT</a> license</p>
        <p>Copyright &copy; 2019-2021 vue.lzread.com </p>

      </div>

    </aside>

  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      redirect: undefined,
      otherQuery: {},
      loginForm: {
        username: "m2",
        password: "123456"
      }
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  methods: {
    login() {
      this.$store.dispatch("user/login", this.loginForm).then(() => {
        this.$router.push({
          path: this.redirect || "/",
          query: this.otherQuery
        });
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>


<style lang="scss">
$theme:#1296db;
#Login{width: 100%; height: 100%; display: flex; display: -webkit-flex; align-items: center; justify-content: center;
    aside{width: 400px;  display: flex; display: -webkit-flex; align-items: center;
      .login-form{padding: 0 20px; width: 100%; display: flex; display: -webkit-flex; flex-direction: column; align-items: center; justify-content: center;
        h1{font-size: 42px; font-weight: normal; color: $theme; margin-bottom: 100px;}
        .cell{ width: 100%; display: flex; display: -webkit-flex; align-items: center; margin: 10px 0;
          .hd{flex-grow: 0;}
          .bd{flex-grow: 2;
            input{width: 100%; height: 50px; padding: 0 15px 0 35px; border: 0; border-bottom: 2px solid $theme; font-size: 20px;
              &:focus{outline: 0;}
              &.username{background: #fff 0 center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFVUlEQVR4Xu1aTVbbSBD+SmPCcmRfYMx7yNshJwicIHCCwDLyYvAJQk5gz8JiiXOCgRNAThBma/GenQtYmqUxo5rX4mcsuWW1pDKQAEvc6q766qvq+mnCC/+jF64/XgF4ZcALR+DVBV44AR43CNrHoyai2XsL2GKi5jz4xDyOgEtYa2fhx43xYxnmUVzA9q4+EEeHRLRlohgzXzJZvdDd/GKyvsqalQJge1e7hKhLSFrbVGAGjxlWJ3Q3T02/KbpuZQA0PL8L4LCoQBnrexPX6QjtldhGHAC7O7Jp/eaEgF1JgRk45WntIOxshJL7igPQ6A9PQLSvE5IZ3wkYRODTsN26nF9j94dbFmiXgX0i/KZVknkwabcOni0Ajb5/BMKntIAM/MPAUeg6PRPhbc8/JOCIgF/T6yOgY7qPyVliDFBXnMU3owXlGd8ZvJu2eJ5wihEEOtWxIaLahtRVKQZA3fPPCdieVyy2/LTWLOu3d/FknGaCigeB6+zlgWjyuwgAsf8SfVugK/PbopZP77HKvdVZIgA0+lc9EP+RFJ6/TNyWNhiaWGZ+TcMbDgD6kPiO6c9Je7PyNSsCQN0bjtLJjqSf6uKLSpICt7VRFMz0+soA6CjKwNfAdRLxoKqgdW94SaDf5/eJBFysOgDH/rbFOE/SE58nbeeoqtIJN9BcsRFhJ/zoXFQ5pzoAnn9oASrtffiLQHvS+bvdH+5bRCcpBhyE7dbgSQHQJT8Sllm4DVbEtMoMeDQAvKtdC/yXtKtVBkBHTfAjxQDmp3cBW0NNZpwFbUe0Gqz3fZUWv0/EgOcQBJVADc/nRArMCPm6tlE2BV7w/+7IttZvgvT/J65TmcGVN1BC6awj6Qa6OCPFMhEAdHGAhVgQF0RvbkZEsKWvQLFa4I4F43TpqpqbQbv1tso9Xe8Pv6WbqaqxErSdRFe57BkiDFCHqwbowjUFoGwra1lrTTLREgMgMxYoEFSbG1BXVqINlmW122YITnRtdCnfvz9bFIBbq80u0kXLg6LMg4hoELrOV53ytue/s5j3M3uK4L95urYtdbuIxoB7hWLrEV3o+nn3a1SABCHJBsZWOtAlrtaK3aUstoky4AGE41GTeHaayYSCEYtXYPmVuEASgJuu1GwgDqRU60g1QufxF2WAigHWm1k3y4cLGn5xuYoh12udZxkDVDJEoO4yP64MQHyjIGRwp2ofQNQFlk2DUjXCGQGXEXgMi5Ij8IibFqjJiINhoujRAic0JarkArdp6ux82dhb9QcZ1MP0lwtT6qp9sf7vNoHVhOhdFnMYuOBpbc90X90+pQHIUz5WnHBUtWenym3ieEymBSJOsq7XdsqCUBoA3SRIIRxPg5gPpXx0Lr/YJ6KeLr9QTAhcZ6dMjCkFgH4Q8qD8tmnKW1TgpUlWyUFJYQCyix75NFWbLi9Jt8sUSYUAyKrNqw5BCzPh9hHG4tC0RA+iEAA66t/5/Mpov7Ri1NUcBV3BGICs+b/0g4UibFAPKdJDGfV9kbmkMQAZfTmxzkwRxefX1vv+QieqSD/SGIB63w8W+nICbemyiv9feC3OJlW6HLSdusneRgDoIv8qJsAmAuvWaCfHhvNJIwB0DxSe0vfTIOhjgdkDDSMAVv0Aoqzl5/sP6Qdapg8ocgGIa/zUVEZ1aAK3ZfTut6pypt9r3WBaq+fVCPkAaMfSMu9zTJUzWafLUUzG9PkAaB4mFLlmTISXWKMd0xtMj3MB0G5sGGElFDPdQ1ujGIzpcwFIz/2eKvXNA0JXKUYSDMg7+Ef/PZcBP7qCefK/ApCH0M/++ysDfnYL5+n34hnwH0nc4F/ecGZ5AAAAAElFTkSuQmCC); background-size: 24px;}
              &.password{background: #fff 0 center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEtklEQVR4Xu1aTVbbSBD+SsGZZWQuMPBe7G3MCfCcYJgThCxHWgRu4BtAFnaWMScY5gQkJ4DZWnnPzAUssUxMVPNaoIwsWupuqyUDtpZ2/9VXX32q6hJhzR9ac/uxAWDDgDVHYBMCa06A1Yug+3G6A/6xT+ADAC6YXSLqCccw8xWIIgARg85BL75Ef+5e23TaykLAHU7eE3CYGqtrlACFgXHkdz/ozikb1zgA7ujrW0I8INBOFQMYfM1wBpH3+qzKOo0BIKhO8fwvU4+rjEsY4bT+WDY0GgHAHU56BLoggqs0CLgBcHU/rkfAK+UcFhrBv0V+N52nmvLz/9oBcIeTQ4foU9GJmPEvgc5jxCKupQYIAB04hww+IMKvRWvFzO8ivzvWth6o9y2QHJzoUnYgYTiDB6YHFoASaFAERMy8Z8KE2hhwF/O3l3La89nM6x6aeCo/dns0GQP0Nv87i3BwtvZ0NaE2ANrDyaVM8GLgOPI6p1WMT+e6o+DIAU4egsBXod/d09mjFgCK4t6m8SoQdPWgFgDao8n04Xu+Ou2LPCoLB5EnhF53V8UC6wDIaCkEL/Q7lRIflSHtYXCdF0YdxlkHQBb7unRUGVn2vyzsRJKk0gKrAAjld/h2mj1oE95P95OygLZ2y94IdgGQJT1MH2b+66Mq3tWduz38egri99nxKvZZBaA9DM6J8HvuAEaJia6xsnHux6DvMC5yDPw79Dui1JY+dgEYBZ8J2M/uNPM6VvdQAbQ9CngBAOBL6HX6zQCQS34YuAm9jrIAUhll8n97FETZAkolhFa9Y4q+iWG6Y9uGLNwAoIuszrj8a0gUJqHfaevMtTWmPQzCbAHG4H9Cr5vcMcoeqwwwpZ8to7PrmIahXQDW/TUorQLXKRGSpsKaVZmNcJBVoXGTqbAwQpqPL3FXZwqItBhSCKDYw6oGiAULDqJVm5sanY53T6Yu/TK/zN9BrKQcTliQy8aSgzKPZ3733bJGls3bHk4+gWjhjlG3CrXOgIQFBXd1Oh4xBahwL82wqwTAPd3fzLzOcf7gspxAjImZj2z19UR/0SF6cMGqSn6yZ10agIVYl9C7rCdQNRxEzDsv5yd52ieRBtwwbfVqvRaXv+//j/FElF7OL8r6gMs2N1XN1UYaI7Kbl1To4u+tY5XxWQoKIJLWGPNZYWtsFOw7wEHSGivpKqtuf6zWAmWdGZ0maJHYiQIKdN8cZfR01kpoz9w3aYml+y+tAWKBIhDyxglRYk4+hjjN3xiZqr50bWod6MZ8fr4WAGVqrwIhMf5bqx8d74pPXZJXJAEDnbZ3GTjLNleNAVCqfSJ4t1MZVfPGZzdXdXkLQ0QAChrb6i+WMqCK2pcZvwCE+EgqnvcdQp+FwDF20g6PWAOgCHcfQJzDaX1elupFgJYCsKza6xpfNf5tzFdqgKnaPyXjBYBKAIzVPiN4NjxU9xpaAOiA8NQ8b5wH3KW35mpftwerrq/FgLLc/ql6XpsBz9l4pQg+d+OVABR96fXUaa99IVLw8dFCbl9VhFY9XymCWRCek+e1RTDNARjoZau6VXvO1v5KBtja6LGuswHgsXqmqXNtGNAU0o91nw0DHqtnmjrXf3Nx9V9cmfkpAAAAAElFTkSuQmCC); background-size: 24px;}
            }
          }
        .ft{flex-grow: 0;}
          
        }
        & > button{width: 100%; height: 50px; line-height: 50px; font-size: 20px; margin-top: 80px; margin-bottom: 30px; color: #fff; border:1px solid $theme; background-color: $theme; cursor: pointer;
          &:focus{outline: 0;}
        }
        & > p{color: #999; margin: 10px; font-size: 12px; padding: 0;
          a{color:$theme;}
        }
      }
    }
}
</style>
