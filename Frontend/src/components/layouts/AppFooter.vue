<template>
  <footer class="page-footer orange">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Địa chỉ</h5>
          <p class="grey-text text-lighten-4">Phường Xuân Khánh, quận Ninh Kiều, Tp Cần Thơ</p>

          <h5 class="white-text">Chi Tiết</h5>
          <p class="grey-text text-lighten-4">Cung cấp các dịch vụ màu Acrylic. Tại đây bạn có thể lựa chọn màu sắc để
            thỏa sức sáng tạo nghệ thuật.
          </p>

        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Liên hệ</h5>
          <ul>
            <li><a class="white-text" href="#">Facebook: Anh Thư</a></li>
            <li><a class="white-text" href="#">Instagram: Anh Thư</a></li>
            <li><a class="white-text" href="#">Zalo: Anh Thư</a></li>
            <li><a class="white-text" href="#">Hotline: 0909345672</a></li>
          </ul>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Vận chuyển</h5>
          <ul>
            <li><a class="white-text" href="#!">Giao hàng nhanh (GHN)</a></li>
            <li><a class="white-text" href="#!">Bưu điện Việt Nam</a></li>
            <li><a class="white-text" href="#!">Viettel Post</a></li>
            <li><a class="white-text" href="#!">J&T Express</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

import axios from "axios"
import swal from "sweetalert2"
import store from "../../vuex/store"

export default {
  name: "AppFooter",

  data() {
    return {
      page: 0,
    }
  },

  computed: {

    user: function () {
      return store.getters.getUser
    },

    login: function () {
      return store.getters.getLogin
    }
  },
}
</script>