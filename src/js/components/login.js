// Initialize Firebase
var config = {
  apiKey: "AIzaSyCehyBWYJQ_CDE2SbwK_lGpvWDRsrQ4E8g",
  authDomain: "connect-2018.firebaseapp.com",
  databaseURL: "https://connect-2018.firebaseio.com",
  projectId: "connect-2018",
  storageBucket: "connect-2018.appspot.com",
  messagingSenderId: "1095684289814"
};
firebase.initializeApp(config);


// DOMを登録
const inputarea = document.getElementById('login-input-area');
const newuser = document.getElementById('newuser');
const login = document.getElementById('login');
const logout = document.getElementById('logout');
const info = document.getElementById('info');

// 新規登録の処理
newuser.addEventListener('click', function(e) {
	// メールアドレスとパスワードを取得
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	//新規ユーザーを登録
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.catch( function(error) {
		alert('登録できません(' + error.message + ')');
	});
});

// ログインの処理
login.addEventListener('click', function(e) {
	// メールアドレスとパスワードを取得
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	// ログインする
	
})
