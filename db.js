class SimpleDB {
    constructor() {
        this.data = [];
    }

    create(record) {
        this.data.push(record);
    }

    read() {
        return this.data;
    }

    update(index, newRecord) {
        if (index >= 0 && index < this.data.length) {
            this.data[index] = newRecord;
        } else {
            console.error('Record not found.');
        }
    }

    delete(index) {
        if (index >= 0 && index < this.data.length) {
            this.data.splice(index, 1);
        } else {
            console.error('Record not found.');
        }
    }

    find(index) {
        if (index >= 0 && index < this.data.length) {
            return this.data[index];
        } else {
            console.error('Record not found.');
            return null;
        }
    }
}

// Export the class for use in other modules
export default SimpleDB;