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
//ユーザー名を登録
let name = ''


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


// 認証状態の確認
firebase.auth().onAuthStateChanged(function(user) {
	if(user) {
		loginDislay();
		runUserInfoRegister();
	}else{
		logoutDisplay();
	}
});


// ログイン状態の表記関数s
function loginDislay() {
	logout.classList.remove('hide');
	inputarea.classList.add('hide');
	info.textContent = "ログイン中です！";
}
function logoutDisplay() {
	logout.classList.add('hide');
	inputarea.classList.remove('hide');
	info.textContent = "";
}



// ユーザー名を登録したい（以下全部）

// ユーザー情報を登録する
let runUserInfoRegister = function() {
	//現在ログイン中のユーザーを取得
	let currentUser = firebase.auth().currentUser;
	//現在ログインしているユーザーIDを取得
	let userId = currentUser.uid;
	//RealtimeDatabaseに登録
	firebase.database().ref('users/' + userId).set({
		username : name
	});
	//登録が終わったのでログアウトをする
	// runLogout();
}



