<template>
    <div>
        <!-- <div class="buttons" v-if="showButtons">
            <button v-for="buttonDetail in buttonDetails" :key="buttonDetail.id" @click="buttonDetail.method"
                class="icnBtn">
                <img :src="buttonDetail.img" :title="buttonDetail.title" class="icn-img" />
            </button>
        </div>
        <div class="filters" v-if="showFilters">
            <div v-for="filterDetail in filterDetails" :key="filterDetail.id">{{ filterDetail.filterType }}: {{
                    filterDetail.filterValue
            }}% <input type="range" :name="filterDetail.filterType" min="0" max="100"
                    v-model="filterDetail.filterValue" />
            </div>
            <button class="icnBtn" @click="clickSetFilters">
                <img class="icn-img" :src="buttonDetails[4].img" title="Done">
            </button>
        </div> -->
        <div class="buttons">
            <button @click="toggleShowEditButtons" class="icnBtn" v-if="showEditBtns">
                <img :src="editBtnImg" title="Edit Image" class="icn-img">
            </button>
            <div v-if = "!showEditBtns">
                <button v-for="buttonDetail in editBtn" :key="buttonDetail.id" @click="buttonDetail.method"
                    class="icnBtn">
                    <img :src="buttonDetail.img" :title="buttonDetail.title" class="icn-img" />
                </button>    
            </div> 
        </div>
    </div>
</template>
<script>
import editBtnImg from "../../assets/edit-button-image-custom-icon.png"
// import crop from "../../assets/crop.png"
import filter from "../../assets/contrast-icon-brightness.png"
import rotateLeft from "../../assets/circular-counterclockwise-arrow-rotation.png"
import rotateRight from "../../assets/rotating-arrow-symbol.png"
import replace from "../../assets/true.png"
import cancel from "../../assets/forbidden.png"


export default {
    name: 'EditImg',
    data() {
        return {
            showEditBtns: true,
            editBtnImg: editBtnImg,
            editBtn: [
                { id: 0, img: filter, title: "Set Filters", method: this.clickSetFilters },
                { id: 1, img: rotateLeft, title: "Rotate Left", method: this.clickRotateLeft },
                { id: 2 , img: rotateRight, title: "Rotate Right", method: this.clickRotateRight },
                { id: 3, img: replace, title: "Replace Image", method: this.clickReplace },
                { id: 4, img: cancel, title: "Cancel Change", method: this.clickCancel}
            ],
            showFilters: false,
            filterDetails: [
                { id: 0, filterType: "Brightness", filterValue: 100 },
                { id: 1, filterType: "Contrast", filterValue: 100 }
            ],
        }
    },
    methods: {
        toggleShowEditButtons(){
            this.showEditBtns = false;
            this.$emit('crop')
        },
        clickSetFilters() {
            this.showFilters = !this.showFilters
            this.showButtons = !this.showButtons
            this.$emit('setFilters', this.filters[0].filterValue, this.filters[1].filterValue)
        },
        clickRotateRight() {
            this.$emit('rotateRight')
        },
        clickRotateLeft() {
            this.$emit('rotateLeft')
        },
        clickReplace() {
            this.showEditBtns = true;
            this.$emit('replace')
        },
        clickCancel() {
            this.showEditBtns = true;
            this.$emit('cancel')
        }
    }
}
</script>

<style scoped>
.icn-img {
    width: 22px;
}

.icnBtn {
    margin: 3px;
    padding: 8px
}

.filters {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>