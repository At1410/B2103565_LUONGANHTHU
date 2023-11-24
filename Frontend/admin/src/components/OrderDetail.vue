<template>
    <!-- End Navbar -->
    <div class="container-fluid py-4" v-if="order != null">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h2 class="font-weight-bolder">Chi tiết đơn hàng</h2>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0" id="table">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary opacity-7">Tên</th>
                                        <th class="text-uppercase text-secondary opacity-7">Giá</th>
                                        <th class="text-uppercase text-secondary opacity-7">Số lượng</th>
                                        <th class="text-uppercase text-secondary opacity-7">Tổng</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(item) in order.cart" v-bind:key="item._id.toString()">
                                        <td>
                                            <span v-text="item.name"></span>
                                        </td>

                                        <td>
                                            <span v-text="item.price"></span> VNĐ
                                        </td>

                                        <td>
                                            <span v-text="item.units"></span>
                                        </td>

                                        <td>
                                            <span v-text="parseInt(item.price) * item.units"></span> VNĐ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="card-footer">
                        <h3>Tổng: <span v-text="totalOrder"></span> VNĐ </h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" style="margin-top: 30px;">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h2 class="font-weight-bolder">Thông tin khách hàng</h2>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <template v-if="order.paidVia == 'COD'">
                                    <span v-text="order.name"></span> <br />
                                    <span v-text="order.email"></span> <br />
                                    <span v-text="order.mobile"></span> <br />
                                    <span v-text="order.country"></span>
                                </template>
                            </div>

                            <div class="col-md-6">
                                <span v-if="order.paidVia == 'COD'" style="color: rgb(0, 0, 0);">Thanh toán khi nhận
                                    hàng</span>

                                <p v-text="order.status"></p>
                            </div>
                        </div>
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
            order: null,
            orderId: this.$route.params._id
        }
    },

    computed: {
        totalOrder() {
            if (this.order == null) {
                return 0
            }

            let total = 0
            for (let a = 0; a < this.order.cart.length; a++) {
                total += (parseInt(this.order.cart[a].price) * this.order.cart[a].units)
            }
            return total
        }
    },

    methods: {

        getData: async function () {
            const formData = new FormData()
            formData.append("orderId", this.orderId)

            const response = await axios.post(
                this.$apiURL + "/admin/orders/fetchSingle",
                formData,
                {
                    headers: this.$headers
                }
            )

            if (response.data.status == "success") {
                this.order = response.data.order
            } else {
                swal.fire("Error", response.data.message, "error")
            }
        }
    },

    mounted: function () {
        this.getData()
    }
}
</script>

<style>
#table th,
#table td {
    padding-left: 0px !important;
}
</style>