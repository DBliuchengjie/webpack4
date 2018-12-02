<template>
    <div class="ydt_container">
        <div class="rem-test">{{ydt_value}}</div>
        <p>123开22</p>
        <div @click="cityPicker">
            <label>所在地区:</label>
            <input readonly type="text" :placeholder="selecedCity?(myAddressProvince+myAddressCity+myAddresscounty):'地址'" />
        </div>
        <div class="picker-city" v-if="showCityPicker">
            <div class="menu-box">
                <div>取消</div>
                <div @click="confirmCityData">确定</div>
            </div>
            <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
        </div>
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
                showCityPicker:false,
                myAddressSlots: [{
                        flex: 1,
                        defaultIndex: 0,
                        values: Object.keys(myaddress), //省份数组
                        className: 'slot1',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: Object.keys(myaddress['北京市']),
                        className: 'slot3',
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '-',
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
        computed:{
            selecedCity(){
                return this.myAddressProvince&&this.myAddressCity&&this.myAddresscounty ? true :false;
            }
        
        },
        mounted() {},
        methods: {
            onMyAddressChange(picker, values) {
                if (myaddress[values[0]]) { //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                    picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
                    picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
                    this.tempAddressProvince = values[0]+' ';
                    this.tempAddressCity = values[1]+' ';
                    this.tempAddresscounty = values[2] + ' ';
                }
            },
            cityPicker(){
                this.showCityPicker = true;
            },
            confirmCityData() {
                this.myAddressProvince = this.tempAddressProvince;
                this.myAddressCity = this.tempAddressCity;
                this.myAddresscounty = this.tempAddresscounty;
                this.showCityPicker = false;
            },
        }
    };
</script>
<style scoped lang="scss">
    $red:red;
    $blue:blue;

    .rem-test {
        width: 100px;
        font-size: 28PX;
        color: $blue;
    }

    .menu-box {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .picker-city {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }
</style>