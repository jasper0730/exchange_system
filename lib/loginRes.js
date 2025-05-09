// 模擬登入
export const data = {
  Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFESUQ3M2IwZTM4MWFiM2U0YzVlOTQ0N2IzZmFlM2UwN2ZhYiIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTc0Njc2MDA2NCwiZXhwIjoxNzQ3MDE5MjY0LCJpYXQiOjE3NDY3NjAwNjR9.e7qnlUUJE-f4gsKfvQbn8HWhrHkJXoyOGSfGJOUFDf0",
  Role: "member",
  ExpiredTime: "2025/05/30 03:07:44",
  ResultCode: 0,
  Message: "Success"
};

export async function loginFromDB() {
  await new Promise((res) => setTimeout(res, 500));
  return data || {};
}