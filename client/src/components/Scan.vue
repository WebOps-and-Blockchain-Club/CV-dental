<template>
    <div>
        <h1>Scan</h1>
        <button v-on:click="scan">
            <img src="https://cdn-icons-png.flaticon.com/512/2557/2557534.png" class="icn-img" width="20" />
            Scan
        </button>
        <div>
            <img v-bind:src="imgSrc" id="img" style="height:70vh;"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ScanComp',
    data() {
        return {
            connection: null,
            file: null,
            reader: null,
            selDiv: document.querySelector("#selectedFiles"),
            imgSrc:null,
            html: null
        }
    },
    methods: {
        scan() {
            this.connection.send("1100")
        },
    },
    mounted() {
        this.connection = new WebSocket("ws://localhost:8181/")
        this.connection.onmessage = (e) => {
            if (e.data instanceof Blob) {
                this.file = e.data;
                this.file.name = "File"
                this.reader =new FileReader()
                this.reader.onload = function (e) {
                    document.querySelector("#img").src =e.target.result 
                }  
                this.reader.readAsDataURL(this.file)
            }
        }

        this.connection.onopen = function (e) {
            console.log(e)
            console.log("successfully connected")
        }

    }
}
</script>