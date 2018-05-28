<template>
	<div>
		<input type="text" placeholder="用户名" v-model="user.account" />
		<input type="text" placeholder="密码" v-model="user.userpwd" />
		<input type="button" value="登录" @click.stop="login" />
	</div>
</template>
<script>
	export default {
		ready() {

			},
			components: {

			},
			data() {
				return {
					user: {
						account: "",
						userpwd: ""
					}
				}
			},
			methods: {
				login() {
					this.$AjaxPost("user/login", this.user, function(ret) {
						if (ret.code !== "1") {
							$this.$set('code', ret.code);
							$this.$set('msg', ret.msg);
						} else {
							//	$this.$Add("USERINFO",ret.result);
							window.localStorage.setItem("USERINFO", JSON.stringify(ret.result));
							window.location.href = "/";
						}
					});
				}
			}
	}
</script>