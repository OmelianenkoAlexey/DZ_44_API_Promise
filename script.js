// ! ДЗ 44. Promise

// Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
// Ід має бути введений в інпут (валідація: ід від 1 до 100)
// Якщо знайдено пост, то вивести на сторінку блок з постом і
// зробити кнопку для отримання комкоментарів до посту.
// Зробити завдання використовуючи проміси, перехопити помилки.

// fetch("https://jsonplaceholder.typicode.com/posts")
// .then(data => data.json())
// .then(response => console.log(response))

// !!!!!!!!!!!!!!!!
// ! Способ 1

const API = "https://jsonplaceholder.typicode.com";
const inputId = document.getElementById("inputId");
const button = document.getElementById("button");
const box = document.querySelector(".box");
const boxComment = document.createElement("div");

button.addEventListener("click", () => {
    fetch(`${API}/posts/${inputId.value}`)
        .then(data => {
            if (data.status >= 200 && data.status < 400) {
                return Promise.resolve(data.json());
            } else {
                return Promise.reject(data);
            }
        })
        .then(response => {
            console.log(response);
            box.innerHTML = "";
            const title = document.createElement("h2");
            title.innerText = response.title;

            const desription = document.createElement("p");
            desription.innerText = response.body;

            const buttonComents = document.createElement("button");
            buttonComents.innerText = "Комментарии";

            box.append(title);
            box.append(desription);
            box.append(buttonComents);

            buttonComents.addEventListener("click", () => {
                boxComment.innerHTML = "";
                fetch(`${API}/posts/${inputId.value}/comments`)
                    .then(response => response.json())
                    .then(response => {
                        response.forEach(coment => {
                            if (parseInt(inputId.value) === coment.postId) {
                                const postNumber = document.createElement("h2");
                                postNumber.innerText = `Комментарий № ${coment.id}`;

                                const postName = document.createElement("p");
                                postName.innerText = coment.name;

                                const postEmail = document.createElement("p");
                                postEmail.innerText = coment.email;

                                const postBody = document.createElement("p");
                                postBody.innerText = coment.body;

                                boxComment.append(postNumber);
                                boxComment.append(postName);
                                boxComment.append(postEmail);
                                boxComment.append(postBody);
                                box.append(boxComment);
                            }
                        })
                    })
            })
        })
        .catch((error) => {
            alert(`Ошибка ${error.status}. Введите от 1 до 100.`)
        })
})

// !!!!!!!!!!!!!!!!
// ! Способ 2
// const API = "https://jsonplaceholder.typicode.com";
// const controller = action => fetch(action).then(data => data.json());
// const inputId = document.getElementById("inputId");
// const button = document.getElementById("button");
// const box = document.querySelector(".box");

// button.addEventListener("click", () => {
//     controller(`${API}/posts`)
//         .then(responce => {
//             if (inputId.value >= 1 && inputId.value <= 100) {
//                 return Promise.resolve(responce);
//             } else {
//                 return Promise.reject();
//             }
//         })
//         .then(response => {
//             response.forEach(item => {
//                 if (parseInt(inputId.value) === item.id) {
//                     box.innerHTML = "";
//                     const title = document.createElement("h2");
//                     title.innerText = item.title;

//                     const desription = document.createElement("p");
//                     desription.innerText = item.body;

//                     const buttonComents = document.createElement("button");
//                     buttonComents.innerText = "Комментарии";

//                     box.append(title);
//                     box.append(desription);
//                     box.append(buttonComents);

//                     buttonComents.addEventListener("click", () => {
//                         controller(`${API}/comments`)
//                             .then(response => {
//                                 response.forEach(coment => {
//                                     if (parseInt(inputId.value) === coment.postId) {
//                                         const postNumber = document.createElement("h2");
//                                         postNumber.innerText = `Комментарий № ${coment.id}`;

//                                         const postName = document.createElement("p");
//                                         postName.innerText = coment.name;

//                                         const postEmail = document.createElement("p");
//                                         postEmail.innerText = coment.email;

//                                         const postBody = document.createElement("p");
//                                         postBody.innerText = coment.body;

//                                         box.append(postNumber);
//                                         box.append(postName);
//                                         box.append(postEmail);
//                                         box.append(postBody);
//                                     }
//                                 })
//                             })
//                     })
//                 }
//             })

//         })
//         .catch(() => {
//             alert("Вы ввели не верный ID, введите от 1 до 100!!!")
//         })
// })

