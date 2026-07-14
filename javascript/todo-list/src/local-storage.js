export class Storage {
    constructor() {
        this.array = this.retrieve()
        console.log(this.array)
    }

    push(item) {
        this.array.push(item)
        this.save()
    }

    save() {
        localStorage.setItem('array', JSON.stringify(this.array))
    }

    retrieve() {
        return (localStorage.getItem('array') !== null) ? JSON.parse(localStorage.getItem('array')) : []
    }
}