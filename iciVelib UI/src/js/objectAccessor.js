export const ObjectAccessor = {
    objects: [],
    add(name, object) {     
        this.remove(name);
        this.objects.push({ name: name, object: object });
    },
    get(name) {
        var obj = this.objects.find(o => o.name === name);
        if(obj) return obj.object;
        else return null;
    },
    remove(name) {
        const index = this.objects.findIndex(o => o.name === name);
        if (index > -1)
            this.objects.splice(index, 1);
    }
}