export function validate(name: string, str: string, str2?: string): string | null {
    let messege: string | null = null;
    switch (name) {
        case 'login':
            if (str.length === 0) messege = `Поле не может быть пустым`;
            if (str.length < 3 || str.length > 20) messege = `Логин должен быть больше 3 и не больше 20 символов`;
            if (/^[0-9_-]+$/.test(str)) {
                messege = `Логин не может состоять только из цифр или спецсимволов`;
            }
            if (!/^[A-Za-z0-9_-]+$/.test(str)) {
                messege = `Логин может содержать только латинские буквы, `+
                    `цифры, дефис, нижнее подчёркивание`;
            }
            break;

        case 'password':
        case 'oldPassword':
        case 'newPassword':
            if (str.length === 0) messege = `Поле не может быть пустым`;
            if (str.length < 8 || str.length > 40) messege = `Пароль должен быть больше 8 символов и не больше 40 символов`;
            if (!/[0-9]/.test(str) || str === str.toLowerCase()) {
                messege = `Пароль должен содержать хотя бы одну цифру и заглавную букву`;
            }
            break;

        case 'password2':
        case 'newPassword2':
            if (str.length === 0) messege = `Поле не может быть пустым`;
            if (str !== str2) {
                messege = `Пароли не совпадают`;
            }
            break;

        case 'first_name':
        case 'second_name':
        case 'display_name':
            if (str.length === 0) messege = `Поле не может быть пустым`;
            if (!/^[A-ZА-ЯЁ]/.test(str)) {
                messege = `Первая буква должна быть заглавной`;
            }
            if (/[0-9 ]/.test(str)) {
                messege = `Имя не может содержать пробелы или цифры`;
            }
            if (/-$/.test(str)) {
                messege = `Имя не может оканчиваться дефисом`;
            }
            if (/[А-ЯЁа-яё][А-ЯЁ]/.test(str)) {
                messege = `Заглавные буквы не могут быть в середине слова`;
            }
            if (!/^[A-ZА-ЯЁ][A-Za-zа-яё]+(-[A-ZА-ЯЁ]?[A-Za-zа-яё]+)*$/.test(str)) {
                messege = `Имя может содержать только кириллицу/латиницу и дефисы`;
            }
            break;

        case 'email':
            if (str.length === 0) messege = `Поле не может быть пустым`;
            if (!/[^@\s]+@[^@\s]+\.[^@\s]+/.test(str)) {
                messege = `Неверная электронная почта`;
            }
            break;

        case 'phone':
            if (str.length === 0) messege = `Поле не может быть пустым`;
            if (str.length < 10 || str.length > 15) messege = `Телефон должен быть больше 10 символов и не больше 15 символов`;
            if (/ |-/.test(str)) {
                messege = `Телефон} не должен содержать пробелы или дефисы`;
            }
            if (!/^\+?[0-9]+$/.test(str)) {
                messege = `Неверный телефонный номер`;
            }
            break;
            

        case 'message':
            if (str.length === 0) messege = `Сообщение не может быть пустым`;
            break;

        default:
            messege = null;
    }
    return messege;
};
