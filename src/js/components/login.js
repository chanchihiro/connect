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
		loginDislay();
		runUserInfoRegister();
	}else{
		logoutDisplay();
	}
});


// ユーザー情報を登録する
let runUserInfoRegister = function() {
	//現在ログイン中のユーザーを取得
	currentUser = firebase.auth().currentUser;
	//現在ログインしているユーザーIDを取得
	userId = currentUser.uid;
	//RealtimeDatabaseに登録
	firebase.database().ref('users/' + userId).set({
		username : name
	});
	//登録が終わったのでログアウトをする
	// runLogout();
}


// ログイン状態の表記関数s
function loginDislay() {
	logout.classList.remove('hide');
	inputarea.classList.add('hide');
	haveaccount.classList.add('hide');
	currentUser = firebase.auth().currentUser;
	userId = currentUser.uid;
	console.log(userId);
	// databaseから取得して名前を右上に表示する
	let usernameRef = firebase.database().ref('users/' + userId);
	usernameRef.once('value').then(function(snapshot) {
		let usera = snapshot.child("username").val();
		console.log(usera);
		info.textContent = usera ;
	});
}
function logoutDisplay() {
	logout.classList.add('hide');
	inputarea.classList.remove('hide');
	info.textContent = "";
}




