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

// realtimedatabaseを使えるようにする
let database = firebase.database();


// DOMを登録
const inputarea = document.getElementById('login-input-area');
const newuser = document.getElementById('newuser');
const username = document.getElementById('username');
const login = document.getElementById('login');
const logout = document.getElementById('logout');
const info = document.getElementById('info');
const change_login = document.getElementById('change_login');
const change_user = document.getElementById('change_user');
const haveaccount = document.getElementById('haveaccount');
const connect_content = document.getElementById('connect_content');
let currentUser; //ログイン中ユーザーの認証に使う
let userId;
let name;


// 新規登録の処理
newuser.addEventListener('click', function(e) {
	// メールアドレスとパスワードを取得
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	name = document.getElementById('username').value;
	//新規ユーザーを登録
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.catch( function(error) {
		alert('登録できません(' + error.message + ')');
		//上記をappendとかに書き換えよう
	});
});


// ログインの処理
login.addEventListener('click', function(e) {
	// メールアドレスとパスワードを取得
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	// ログインする
	firebase.auth().signInWithEmailAndPassword(email, password)
	.catch( function(error) {
		alert('ログインできません(' + error.message + ')');
		//上記をappendとかに書き換えよう
	});
});


// ログアウト処置
logout.addEventListener('click', function() {
	firebase.auth().signOut();
})


// 新規登録とログインの切り替え
change_login.addEventListener('click', function(e) {
	change_user.classList.remove('hide');
	change_login.classList.add('hide');
	username.classList.add('hide');
	newuser.classList.add('hide');
	login.classList.remove('hide');
});
change_user.addEventListener('click', function(e) {
	change_user.classList.add('hide');
	change_login.classList.remove('hide');
	username.classList.remove('hide');
	newuser.classList.remove('hide');
	login.classList.add('hide');
})


// 認証状態の確認
firebase.auth().onAuthStateChanged(function(user) {
	if(user) {
		console.log(user);
		if(user.displayName === null) {
			runUserInfoRegister();
		}
		loginDislay();
	}else{
		logoutDisplay();
	}
});


// ユーザー情報を登録する
let runUserInfoRegister = function() {
	console.log(name);
	let user = firebase.auth().currentUser;
	user.updateProfile({
        displayName: name
    });
}


// ログイン状態の表記関数s
function loginDislay() {
	logout.classList.remove('hide');
	inputarea.classList.add('hide');
	haveaccount.classList.add('hide');
	connect_content.classList.remove('hide');
	currentUser = firebase.auth().currentUser;
	userId = currentUser.uid;
	// databaseから取得して名前を右上に表示する
	let user = firebase.auth().currentUser;
	info.textContent = user.displayName ;
}
function logoutDisplay() {
	logout.classList.add('hide');
	inputarea.classList.remove('hide');
	connect_content.classList.add('hide');
	info.textContent = "";
}




