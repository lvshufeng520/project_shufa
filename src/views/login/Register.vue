<template>
  <v-app>
    <div id="register">
      <div id="registerBox">
        <h3>注册</h3>
        <p class="register_title">快来加入我们吧(･ω･)</p>
        <div>
          <v-form ref="form" v-model="valid">
            <v-col cols="12" md="4" class="register_input">
              <v-text-field
                v-model="username"
                :counter="10"
                :rules="userNameRules"
                label="用户名"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="register_input">
              <v-text-field
                type="password"
                v-model="password"
                :rules="passwordRules"
                label="密码"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="register_input">
              <v-text-field
                v-model="phone"
                :rules="phoneRules"
                label="手机号"
                required
                lazy-validation="true"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="register_input">
              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || '请同意!']"
                label="同意赛大家书法网服务条款"
                required
              ></v-checkbox>
            </v-col>
          </v-form>
          <v-btn depressed large color="blue lighten-1" class="register_btn" @click="getData()">注册</v-btn>
          <span class="jump_right" @click="jumpLogin()">返回登陆</span>
        </div>
      </div>
    </div>
    <v-bottom-sheet v-model="sheet" persistent>
      <v-sheet class="text-center" height="150px">
        <v-btn class="mt-6" text color="error" @click="sheet = !sheet">关闭</v-btn>
        <div class="py-3">注册失败</div>
      </v-sheet>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
import Vuetify from "vuetify";
export default {
  vuetify: new Vuetify(),
  data: () => ({
    sheet: false,
    valid: true,
    username: "",
    userNameRules: [
      (v) => !!v || "用户名不为空",
      (v) => (v && v.length <= 10) || "用户名过长",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "密码不为空",
      (v) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(v) ||
        "8-16个字符，至少1个大写字母，1个小写字母和1个数字，",
    ],
    phone: "",
    phoneRules: [
      (v) => !!v || "手机号不为空",
      (v) => /^1(3|4|5|6|7|8|9)\d{9}$/.test(v) || "手机号必须是有效的",
    ],
    checkbox: "",
  }),
  methods: {
    jumpLogin() {
      this.$router.push("/login");
    },
    getData() {
      if (this.valid == false) {
        this.$refs.form.validate();
      } else {
        let params = {
          passWord: this.password,
          phoneNumber: this.phone,
          registerTime: this.formatDate(new Date().getTime()),
          userName: this.username,
        };
        this.$axios
          .post("/CalligraphyService/user/register", params, {
            headers: {
              "X-APP-ID": "1",
              "X-APP-KEY": "1",
              "X-Request-ID": "1",
            },
          })
          .then((response) => {
            console.log(response);
            if (response.data.code == "0") {
              console.log(response);
              this.$router.push("/login");
            } else {
              // console.log(response.data);
              this.sheet = !this.sheet;
            }
          });
      }
    },
    formatDate(datetime) {
        var date = new Date(datetime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var year = date.getFullYear(),
            month = ("0" + (date.getMonth() + 1)).slice(-2),
            sdate = ("0" + date.getDate()).slice(-2),
            hour = ("0" + date.getHours()).slice(-2),
            minute = ("0" + date.getMinutes()).slice(-2),
            second = ("0" + date.getSeconds()).slice(-2);
        // 拼接
        var result = year + "-"+ month +"-"+ sdate +" "+ hour +":"+ minute +":" + second;
        // 返回
        return result;
    }
  },
};
</script>

<style lang='less' scoped>
#register {
  width: 100vw;
  padding: 0;
  margin: 0;
  height: 100vh;
  font-size: 16px;
  color: #fff;
  font-family: "Source Sans Pro";
  background-image: url("../../../images/login.jpg");
  background-size: 100% 100%;
  position: relative;
}
#registerBox {
  width: 80%;
  height: 80%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 20px 30px 20px 30px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  background: linear-gradient(
    230deg,
    rgba(53, 57, 74, 0) 0%,
    rgb(0, 0, 0) 100%
  );
}
.register_title {
  font-size: 1vw;
  margin: 0%;
}
.register_fields {
  position: relative;
  width: 100%;
  height: 20%;
  margin-bottom: 3%;
}
.register_btn {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 15px;
}
.register_input {
  height: 12vh;
}
.jump_right {
  float: right;
}
</style>
