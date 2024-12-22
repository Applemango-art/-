// 의견 데이터 (LocalStorage에서 로드)
let comments = JSON.parse(localStorage.getItem("comments")) || [];

// 페이지 로드 시 의견 표시
window.onload = function () {
  displayComments();
};

// 의견 추가 함수
function addComment() {
  const name = document.getElementById("name").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (name === "" || comment === "") {
    alert("이름과 의견을 모두 입력하세요!");
    return;
  }

  // 새로운 의견 추가
  comments.push({ name: name, comment: comment, reply: "" });

  // LocalStorage에 저장
  localStorage.setItem("comments", JSON.stringify(comments));

  // UI 갱신
  displayComments();

  // 입력 필드 초기화
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
}

// 의견 리스트 표시 함수
function displayComments() {
  const commentsDiv = document.getElementById("comments");
  commentsDiv.innerHTML = "";

  comments.forEach((item, index) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    commentDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.comment}</p>
      <div class="reply">${item.reply ? "답변: " + item.reply : "답변이 없습니다."}</div>
      <div class="input-group">
        <input type="text" id="reply-${index}" placeholder="답변을 입력하세요">
        <button class="btn" onclick="addReply(${index})">답변 제출</button>
      </div>
    `;

    commentsDiv.appendChild(commentDiv);
  });
}

// 답변 추가 함수
function addReply(index) {
  const replyInput = document.getElementById(`reply-${index}`);
  const reply = replyInput.value.trim();

  if (reply === "") {
    alert("답변을 입력하세요!");
    return;
  }

  // 답변 저장
  comments[index].reply = reply;

  // LocalStorage에 저장
  localStorage.setItem("comments", JSON.stringify(comments));

  // UI 갱신
  displayComments();
}
