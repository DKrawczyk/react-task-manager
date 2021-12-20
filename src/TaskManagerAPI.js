class TaskManagerAPI {
    constructor() {
        this.apiURL = 'http://localhost:3005/data';    
    }

    loadData() {
        return this._fetch();
    }

    uploadNewTask(task) {
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {'Content-Type': 'application/json'}
        }
        return this._fetch(options);
    }

    updateData(data, id){
        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }
        return this._fetch(options, `/${id}`);
    }

    _fetch(options, additionalPath = '') {
        const url = this.apiURL + additionalPath;
        return fetch(url, options)
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
            return Promise.reject(resp);
        })
    }
}

export default TaskManagerAPI;