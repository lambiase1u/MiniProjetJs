window.TaskManager = (() => {

    let module = {};

    module.form = (selector) => {
        // main container
        let mainContainer = $('<div>').addClass('container-fluid');
        let rowform = $('<div>').addClass('row').append('<br><br>');
        let formContainer = $('<div>').addClass('col-sm-12');

        //form
        let form = $('<form>').addClass('form-inline');
        let formGroupName = $('<div>').addClass('form-group');

        // input name
        let labelName = $('<label>').addClass('col-form-label').text('Task name');
        let inputName = $('<input>').addClass('form-control').attr('data-id', 'nameTask').attr('type', 'text');

        formGroupName.append(labelName).append(inputName);

        // input duration
        let formGroupDuration = $('<div>').addClass('form-group');
        let labelDuration = $('<label>').addClass('col-form-label').text('Duration task');
        let inputDuration = $('<input>').addClass('form-control').attr('data-id', 'durationTask').attr('type', 'text');

        formGroupDuration.append(labelDuration).append(inputDuration);

        //button to add task
        let addButton = $('<button>').addClass('btn btn-default').attr('id', 'add_task_button').attr('type', 'button').text('Ajouter une tache');


        //append all to the form container
        form.append(formGroupName);
        form.append(formGroupDuration);
        form.append(addButton);

        mainContainer.append(rowform).append(formContainer).append(form);

        //table to display tasks
        let rowTable = $('<div>').addClass('row');
        let divTable = $('<div>').addClass('col-lg-8').append('<br/>');
        let tableTask = $('<table>').addClass('table table-bordered');
        let tableHead = $('<thead>');
        let tableHeadRow = $('<tr>');

        let taskName = $('<th>').text('Name');
        let taskDuration = $('<th>').text('Duration');
        let taskTag = $('<th>').text('Tag');

        tableHeadRow.append(taskName).append(taskDuration).append(taskTag);
        tableHead.append(tableHeadRow);
        tableTask.append(tableHead);
        tableTask.append($('<tbody>').attr('id', 'tbody_task'));
        divTable.append(tableTask);
        rowTable.append(divTable);
        mainContainer.append(rowTable);

        $(selector).append(mainContainer);
    };




    module.Task = class Task {

        constructor(name, duration, tag) {

            if (!arguments.length) {
                this.autoLoad = false;
            } else {
                this.name = name;
                this.duration = duration;
                this.tag = {};
            }
        }

        show() {
            let container = $('#tbody_task');

            let task = $('<tr>');

            let hourMin = this.duration.split(":");
            hourMin = parseInt(hourMin[0] * 60) + parseInt(hourMin[1]);
            switch (true) {
                case hourMin <= 60:
                    task.addClass('success');
                    break;

                case hourMin <= 120:
                    task.addClass('info');
                    break;

                case hourMin <= 180:
                    task.addClass('warning');
                    break;

                case hourMin > 180:
                    task.addClass('danger');
                    break;

            }

            task.append(this.displayName());

            container.append(task);
        }

        displayName() {
            return $('<td>').text(this.name);
        }

        displayDuration() {
            return $('<td>').text(this.duration);
        }

        displayTag() {
            let taghtml = "";

            $.each(this.tag, (key, value) => {
                taghtml += value + ', ';
            });

            return $('<td>').text(taghtml);
        }

        add_task(selector_button) {
            $(document).on("click", selector_button, (event) => {
                let duration = $('#duration').val();
                let name = $('#name').val();
                let tag = $('#tags').val().split(',');
                let t = new Task(name, duration, tag);

                t.show();
            });
        }
    };

    return module;
})();

$(() => {
    console.log(TaskManager);
    TaskManager.form('body');
    t1 = new TaskManager.Task();
    t1.add_task('#add_task_button');
});