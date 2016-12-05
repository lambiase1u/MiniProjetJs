window.TaskManager = (() => {

    let module = {};

    module.Task = class Task {

        constructor(name, duration, tag) {

            if (!arguments.length) {
                this.autoLoad = false;
            } else {
                this.name = name;
                this.duration = duration;
                this.tag = tag;
            }
        }

        display() {
            let container = $('#tbody_task');

            let task = $('<tr>');

            task.append(this.displayName());
            task.append(this.displayDuration(task));
            task.append(this.displayTag());

            container.append(task);
        }

        displayName() {
            return $('<td>').text(this.name);
        }

        displayDuration(tr) {
            let hour = this.duration.split(":");
            let hourMin = parseInt(hour[0] * 60) + parseInt(hour[1]);

            switch (true) {
                case hourMin <= 60:
                    tr.addClass('success');
                    break;

                case hourMin <= 120:
                    tr.addClass('info');
                    break;

                case hourMin <= 180:
                    tr.addClass('warning');
                    break;

                case hourMin > 180:
                    tr.addClass('danger');
                    break;
            }

            return $('<td>').text(hour + ' h');
        }

        displayTag() {
            let tag = $('<td>');
            let taghtml = "";


            let data_list = $('<datalist>').attr('id', 'tag');

            if ($.isArray(this.tag)) {
                $.each(this.tag, (key, value) => {
                    taghtml += value + ', ';
                    data_list.append($('<option>').attr('value', value));
                });
            }else{
                alert('To display tag in '+ this.name+ ' put tag in array to the task constructor please !');
                console.log('To display tag in '+ this.name+ ' put tag in array to the task constructor please !');
            }

            let field = $('<input>').attr('type', 'text').attr('list', 'tag').attr('value', this.tag);
            let button = $('<input>').attr('type', 'submit');
            let form = $('<form>').append(field).append(data_list).append(button);
            let in_edit = false;

            tag.click(event => {
                event.stopPropagation();
                event.preventDefault();

                let target = $(event.target);

                if (target.is('td') && !in_edit) {
                    tag.empty();
                    tag.append(form);
                    in_edit = true;
                }

                if (target.is('input') && target.prop('type') === 'submit') {
                    this.tags = field.val();
                    tag.empty();
                    tag.text(this.tags);
                    in_edit = false;
                }
            });

            return tag.text(taghtml);
        }

        add_task(selector_button) {
            $(document).on("click", selector_button, event => {
                let duration = $('[data-id="durationTask"]').val();
                let name = $('[data-id="nameTask"]').val();
                let tag = '';
                //let tag = $('#tags').val().split(',');

                let t = new Task(name, duration, tag);
                t.display();
            });
        }
    };

    module.tasks = [];

    module.form = selector => {
        // main container
        let mainContainer = $('<div>').addClass('container-fluid');
        let rowform = $('<div>').addClass('row').append('<br><br>');
        let formContainer = $('<div>').addClass('col-sm-12');

        //form
        let form = $('<form>').addClass('form-inline');
        let formGroupName = $('<div>').addClass('form-group');

        // input name
        let labelName = $('<label>').addClass('col-form-label').text('Task name');
        let inputName = $('<input>').addClass('form-control').attr('data-id', 'nameTask').attr('type', 'text').attr('placeholder', 'Task name');

        formGroupName.append(labelName).append(inputName);

        // input duration
        let formGroupDuration = $('<div>').addClass('form-group');
        let labelDuration = $('<label>').addClass('col-form-label').text('Duration task');
        let inputDuration = $('<input>').addClass('form-control').attr('data-id', 'durationTask').attr('type', 'time').attr('value', '00:00:00');

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

    module.display_tasks = selector => {
        let container = $('<ul>').prop('id', 'tasks');
        $(selector).append(container);

        let _iteratorNormalCompletion = true;
        let _didIteratorError = false;
        let _iteratorError = undefined;

        try {
            for (let _iterator = module.tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                let task = _step.value;

                $(container).append(task.display());
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };

    return module;
})();

$(() => {
    TaskManager.form('body');
    TaskManager.tasks.push(new TaskManager.Task('tache1', '1:00', ['tag1']));
    TaskManager.tasks.push(new TaskManager.Task('tache2', '2:00', ['tag2']));
    TaskManager.tasks.push(new TaskManager.Task('tache3', '3:00', ['tagueule']));
    TaskManager.display_tasks('#taskmanager');

    t1 = new TaskManager.Task();
    t1.add_task('#add_task_button');
});
