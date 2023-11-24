<template>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="font-weight-bolder">Thêm sản phẩm</h4>
                    </div>

                    <div class="card-body">
                        <form v-on:submit.prevent="addProduct" enctype="multipart/form-data">
                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Tên sản phẩm</label>
                                <input type="text" class="form-control" name="name" autocomplete="off" required />
                            </div>

                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Mô tả</label>
                                <textarea name="description" class="form-control" style="margin-top: 50px;"
                                    required></textarea>
                            </div>

                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Giá (VNĐ)</label>
                                <input type="number" min="0" autocomplete="off" name="price" class="form-control"
                                    required />
                            </div>

                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Sản phẩm trong kho.</label>
                                <input type="number" min="0" name="itemsInStock" autocomplete="off" class="form-control"
                                    required />
                            </div>

                            <div class="input-group input-group-outline mb-3">
                                <label class="form-label no-left-margin">Hình ảnh</label>
                                <input type="file" name="images" class="form-control" v-on:change="previewImages"
                                    ref="images" required />
                            </div>

                            <div v-for="(image, index) in images" class="row" style="margin-top: 20px;">
                                <div class="col-md-8">
                                    <img v-bind:src="image.src" style="width: 100%;" />
                                </div>
                            </div>

                            <div class="text-center">
                                <button type="submit" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                                    ref="btnAddProduct">Thêm sản phẩm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios"
import swal from "sweetalert2"

export default {
    data() {
        return {
            images: []
        }
    },

    methods: {
        previewImages: function () {
            const self = this
            const files = this.$refs["images"].files

            for (let a = 0; a < files.length; a++) {
                const file = files[a]
                const fileReader = new FileReader()

                fileReader.onload = function (event) {
                    self.images[a] = {
                        src: event.target.result,
                        size: files[a].size
                    }
                }

                fileReader.readAsDataURL(file)
            }
        },

        addProduct: async function () {
            const form = event.target
            const formData = new FormData(form)

            this.$refs["btnAddProduct"].setAttribute("disabled", "disabled")

            const response = await axios.post(
                this.$apiURL + "/admin/products/add",
                formData,
                {
                    headers: this.$headers
                }
            )

            this.$refs["btnAddProduct"].removeAttribute("disabled")

            if (response.data.status == "success") {
                form.reset()
            }

            swal.fire("Thêm sản phẩm", response.data.message, response.data.status)
        }
    }
}
</script>

<style>
.no-left-margin::before {
    width: auto !important;
}
</style>