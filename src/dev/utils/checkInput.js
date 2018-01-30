export default{
        isMobile(content) {
            return /^1\d{10}$/.test(content);
        },
        isEmail(content) {
            return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(content);
        },
        isPassword(content) {
            return content.length >= 6;
        }
}