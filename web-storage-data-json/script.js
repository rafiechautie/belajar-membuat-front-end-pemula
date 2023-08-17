const storageKey = 'STORAGE_KEY';
const submitAction = document.getElementById('form-data-user');

//memeriksa apakah fitur web storage didukung oleh browser yang kita gunakan melalui sebuah fungsi bernama checkForStorage()
function checkForStorage() {
    return typeof (Storage) !== 'undefined';
  }

  function putUserList(data) {
    //jika fitur web storage didukung
    if (checkForStorage()) {
      //buat variabel bernama userData yang akan menampung semua data pada item storage  
      let userData = [];
      /*
      Jika item storage yang digunakan belum dibuat, kita akan memberikan nilai array kosong ke variabel userData.
      Jika tidak, kita akan mengambil data yang disimpan dan memasukkannya ke fungsi JSON.parse().
      */ 
      if (localStorage.getItem(storageKey) !== null) {
        userData = JSON.parse(localStorage.getItem(storageKey));
      }
      /**
       * Kode userData.unshift(data) akan memasukkan nilai yang disimpan di parameter data
       *  di elemen paling depan array yang tersimpan di variabel userData
       */
      userData.unshift(data);
      /**
       * Kode di dalam kondisi if terakhir (userData.length > 5) berfungsi 
       * untuk menghilangkan data pada elemen paling terakhir jika panjang userData melebihi 5. 
       * Hal ini dilakukan untuk memunculkan 5 data dari user yang paling baru agar tampilan halaman web tetap rapi.
       */
      if (userData.length > 5) {
        userData.pop();
      }
      localStorage.setItem(storageKey, JSON.stringify(userData));
    }
  }

  //fungsi untuk mendapatkan semua data pada item storage yang berisi data user yang sudah di-input
  /**
   * 
   * Fungsi ini mengembalikan nilai array dari localStorage ketika sudah memiliki nilai
   *  sebelumnya melalui JSON.parse(). Namun, jika item storage yang kita ambil masih kosong,
   *  fungsi ini akan mengembalikan nilai array kosong.
   */
  function getUserList() {
    if (checkForStorage()) {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } else {
      return [];
    }
  }

  //fungsi untuk merender data user pada tabel HTML
  function renderUserList() {
    const userData = getUserList();
    const userList = document.querySelector('#user-list-detail');
    userList.innerHTML = '';
    for (let user of userData) {
      let row = document.createElement('tr');
      row.innerHTML = '<td>' + user.nama + '</td>';
      row.innerHTML += '<td>' + user.umur + '</td>';
      row.innerHTML += '<td>' + user.domisili + '</td>';
      userList.appendChild(row);
    }
  } 


  submitAction.addEventListener('submit', function (event) {
    const inputNama = document.getElementById('nama').value;
    const inputUmur = document.getElementById('umur').value;
    const inputDomisili = document.getElementById('domisili').value;
    const newUserData = {
      nama: inputNama,
      umur: inputUmur,
      domisili: inputDomisili,
    }
    putUserList(newUserData);
    renderUserList();
  });


  window.addEventListener('load', function () {
    if (checkForStorage) {
      if (localStorage.getItem(storageKey) !== null) {
        renderUserList();
      }
    } else {
      alert('Browser yang Anda gunakan tidak mendukung Web Storage');
    }
  });