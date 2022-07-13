// 유효성 검사 : 이메일 작성시 (. , @)는 반드시 한개만 입력 가능
export function checkUserEmail(email) {
  return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email)
}

// 유효성 검사 : 비밀번호 작성시 대,소문자 구분x 특수문자 한개 이상 포함, 8자리이상
export function checkPassword(password) {
  return /^(?=.*[a-zA-z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-z\d@$!%*#?&]{8,}$/.test(password)
}
