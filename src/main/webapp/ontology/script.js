
var checked_ids = []

function fetchJSONData(string) {
    var JSONPath = string + '.json'
    var fetchedData
    $.ajax({
        dataType: "json",
        url: JSONPath,
        async: false,
        success: function (answer) {
            fetchedData = answer
        },
        error: function () {
            console.log('Errore');
            fetchedData = "null"
        }
    });
    return fetchedData
}

function buildTree() {
    var fetchedJSON = fetchJSONData('ateneo')
    $('#jstree_demo_div').jstree({
        "core": {
            "multiple": true,
            "data": fetchedJSON.values,
            'themes': {
                'name': 'proton',
                'responsive': true
            }
        },
        "plugins": ["themes", "checkbox", "ui", "types"],
        "checkbox": {
            "three_state": false,
        }
    });

    $('#jstree_demo_div').on('changed.jstree', function (e, data) {
        checked_ids = [];
        var selectedNodes = $('#jstree_demo_div').jstree("get_selected", true);
        $.each(selectedNodes, function () {
            checked_ids.push(this.id);
        });
        document.getElementById('values-textarea').value = checked_ids.join('\n');
    });
}

$(document).ready(() => buildTree());

function buttonClicked() {

}

function getOntology() {
    var ontologySelected = document.getElementById("ontologySelect").getElementsByTagName("select")[0].value;
    var newOntology = fetchJSONData(ontologySelected)
    $("#jstree_demo_div").jstree(true).settings.core.data = newOntology.values
    $('#jstree_demo_div').jstree(true).refresh();
}

function getSelected() {
    try {
        alert("Concetti salvati correttamente")
        console.log(checked_ids)
        window.close();
        return checked_ids
    }
    catch (e) {
        alert("Errore")
        console.log(e)
        return 0
    }
}
