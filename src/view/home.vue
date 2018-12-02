<template>
    <div class="ydt_container">
        <div @click="cityPicker">
            <label>所在地区:</label>
            <input readonly type="text" :placeholder="selecedCity?(myAddressProvince+myAddressCity+myAddresscounty):'地址'" />
        </div>
        <transition name="fade">
            <div class="picker-city-box" @click="cancelCityData" v-if="showCityPicker"></div>
        </transition>
        <transition name="slide">
            <!-- <div class="picker-city-box" v-if="showCityPicker"> -->
            <div class="picker-city" v-if="showCityPicker">
                <div class="menu-box">
                    <div @click="cancelCityData">取消</div>
                    <div @click="confirmCityData">确定</div>
                </div>
                <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
            </div>
            <!-- </div> -->
        </transition>
    </div>
</template>
<script>
    import myaddress from '../data/area' //引入省市区数据  myaddress[myaddress[Object.keys(myaddress)[0]]][Object.keys(myaddress[Object.keys(myaddress)[2]])[0]]
    export default {
        data() {
            return {
                ydt_value: "52.13",
                myAddressProvince: '',
                myAddressCity: '',
                myAddresscounty: '',
                tempAddressProvince: '',
                tempAddressCity: '',
                tempAddresscounty: '',
                showCityPicker: false,
                myAddressSlots: [{
                        flex: 1,
                        defaultIndex: 0,
                        values: Object.keys(myaddress), //省份数组
                        className: 'slot1',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: Object.keys(myaddress['北京市']),
                        className: 'slot3',
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '',
                        className: 'slot4'
                    },
                    {
                        flex: 1,
                        values: myaddress['北京市']['市辖区'],
                        className: 'slot5',
                        textAlign: 'center'
                    }
                ]
            };
        },
        computed: {
            selecedCity() {
                return this.myAddressProvince && this.myAddressCity && this.myAddresscounty ? true : false;
            }

        },
        mounted() {},
        methods: {
            onMyAddressChange(picker, values) {
                if (myaddress[values[0]]) { //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                    picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
                    picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
                    this.tempAddressProvince = values[0] + ' ';
                    this.tempAddressCity = values[1] + ' ';
                    this.tempAddresscounty = values[2] + ' ';
                }
            },
            cityPicker() {
                this.showCityPicker = true;
            },
            confirmCityData() {
                this.myAddressProvince = this.tempAddressProvince;
                this.myAddressCity = this.tempAddressCity;
                this.myAddresscounty = this.tempAddresscounty;
                this.showCityPicker = false;
            },
            cancelCityData() {
                this.showCityPicker = false;
            },
        }
    };
</script>
<style scoped lang="scss">
    .menu-box {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
    }

    .menu-box div {
        color: blue;
    }

    .picker-city-box {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 0;
        left: 0;
    }

    .picker-city {
        position: absolute;
        background: #ffffff;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .picker-selected {
        border-top: 1px solid #000000;
        border-bottom: 1px solid #000000;
    }

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .fade-enter-active {
        transition: all .3s ease;
    }

    .fade-leave-active {
        transition: all .3s ease-in;
    }

    .fade-enter,
    .fade-leave-to

    /* .fade-leave-active for below version 2.1.8 */
        {
        opacity: 0;
    }

    .slide-enter-active {
        animation: slide .3s;
    }

    .slide-leave-active {
        animation: slide .3s reverse;
    }

    @keyframes slide {
        0% {
            /* top: calc(100%); */
            bottom: -400px;
        }



        100% {
            bottom: 0;
        }
    }
</style>