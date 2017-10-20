console.log("character_action動いてるよ")

// DOMを登録
const btn_iraira = document.getElementById('btn_iraira');
const btn_nadenade = document.getElementById('btn_nadenade');
const iraira_count = document.getElementById('iraira_count');
const nadenade_count = document.getElementById('nadenade_count');
let iraira_num;
let nadenade_num;

//イライラカウントを表示する
function disp_iraira() {
	//現在ログイン中のユーザーを取得
	currentUser = firebase.auth().currentUser;
	console.log(currentUser);
	//現在ログインしているユーザーIDを取得
	userId = currentUser.uid;
	let iraira_countRef = firebase.database().ref('users/' + userId);
	iraira_countRef.on('value', function(snapshot) {
		console.log(snapshot.val())
		iraira_count.textContent = snapshot.val();
	});
}

//イライラを押したらイライラデータが更新される
btn_iraira.addEventListener('click', function(e) {
	// データベースから数字を持ってくる
});