    
var canvas = new fabric.Canvas('c');

//event canvas
canvas.on('before:transform', function(){
    var obj = canvas.getActiveObject();

    console.log(obj.type);
    if (obj.type == "i-text")
    {
        $('#monTexte').val(obj.text)
        $('#police').val(obj.fontFamily)
        $('#fontSize').val(obj.fontSize)
    }

    if ($('#type-of-color').val() == "fill")
    {
        $('#color').val(obj.fill)
    }else {
        if (obj.backgroundColor != "")
        $('#color').val(obj.backgroundColor)
    }

    if (obj.stroke != undefined)
    {
        $('#colorBorder').val(obj.stroke)
        $('#sizeBorder').val(obj.strokeWidth)
    }else {
        $('#colorBorder').val('#FFFFFF')
        $('#sizeBorder').val(0)
    }
})

//canvas

function add(o)
{
    canvas.add(o);

    canvas.setActiveObject(o);

    objs = canvas.getObjects();

    console.log(objs);
}

function deleteObjet(){
    var objs = canvas.getActiveObjects();

    console.log(objs)

    for (let obj of objs)
    {
        canvas.remove(obj);
    }
    
    canvas.discardActiveObject()

    canvas.renderAll();
}

$('#sendBackwards').on('click', function(){
    obj = canvas.getActiveObject();

    obj.sendBackwards();

    canvas.renderAll();
})

$('#sendToBack').on('click', function(){
    obj = canvas.getActiveObject();

    obj.sendToBack();

    canvas.renderAll();
})

$('#bringForward').on('click', function(){
    obj = canvas.getActiveObject();

    obj.bringForward();

    canvas.renderAll();
})

$('#bringToFront').on('click', function(){
    obj = canvas.getActiveObject();

    obj.bringToFront();

    canvas.renderAll();
})

$('#delete').on('click', function(){
    deleteObjet()
})

$('#group').on('click', function(){
    var obj = canvas.getActiveObject();

    obj.toGroup();

    canvas.renderAll();
})

$('#degroup').on('click', function(){
    var obj = canvas.getActiveObject();

    obj.toActiveSelection();

    canvas.renderAll();
})

$('#addImage').on('change', function(e){

    const file = e.target.files[0];

    if (file){
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function (e){
            fabric.Image.fromURL(e.target.result, function(img){

                canvas.add(img);
            })
        }
    }
})


//objets
$('#colorBorder').on('input', function(){
    obj = canvas.getActiveObject();

    obj.set({
        stroke: $('#colorBorder').val()
    })

    canvas.renderAll();
})

$('#sizeBorder').on('input', function(){
    obj = canvas.getActiveObject();

    obj.set({
        strokeWidth: parseInt($('#sizeBorder').val())
    })

    canvas.renderAll();
})

$('#color').on('input', function(){
    var obj = canvas.getActiveObject();

    if ($('#type-of-color').val() == "backgroundColor")
    {
        obj.set({
            backgroundColor: $('#color').val()
        })
    }else {
        obj.set({
            fill: $('#color').val()
        })
    }

    canvas.renderAll();
})

$('#type-of-color').on('change', function(){
    var obj = canvas.getActiveObject();

    if ($('#type-of-color').val() == "backgroundColor")
    {
        $('#color').val(obj.backgroundColor)
    }else {
        $('#color').val(obj.fill)
    }
})

//forme géométrique
$('#addTriangle').click(function(){
    var t = new fabric.Triangle({
        width: 100,
        height: 100, 
        fill: '#B06758', 
        left: 50,
        top: 50,
        originX: 'center',
        originY: 'center',
        angle: 180,
    });

    add(t)
})

$('#addCircle').click(function(){
    var circle = new fabric.Circle({
        fill: '#228FC6', 
        left: 50,
        top: 50,
        originX: 'center',
        originY: 'center',
        radius: 50,
    });

    add(circle)
})

$('#addRectangle').click(function(){
    var rect = new fabric.Rect({
        width: 200,
        height: 100, 
        fill: '#79C744', 
        left: 50,
        top: 50,
        originX: 'center',
        originY: 'center'
    });

    add(rect)
})

//text
$('#addText').click(function(){
    var text = new fabric.IText('Mon texte', {
        fontSize: 50,
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: 'center',
        originY: 'center',
        fill: '#000000'
    })

    text.setSelectionStyles({
        fontWeight: "normal",
        fontFamily: "Arial"
    }, 0, text.text.length);

    add(text);

    $('#fontSize').val(text.fontSize)
})

$('#changeToBold').click(function(){
    var text = canvas.getActiveObject()
    var textLength = text.text.length

    if (text.isEditing)
    {
        styles = text.getSelectionStyles();

        if (styles[0].fontWeight == "normal" || styles[0].fontWeight == undefined)
        {
            text.setSelectionStyles({
                fontWeight: "bold"
            });
        }else{
            text.setSelectionStyles({
                fontWeight: "normal"
            });
        }
    }else {
        var char = text.getSelectionStyles(0,1);

        if (char[0].fontWeight == "normal")
        {
            text.setSelectionStyles({
                fontWeight: "bold"
            },0, textLength);
        }else {
            text.setSelectionStyles({
                fontWeight: "normal"
            },0, textLength);
        }
    }
    
    canvas.renderAll()
})

$('#monTexte').on('input', function(){
    var text = canvas.getActiveObject()

    text.set({
        text: $('#monTexte').val()
    })

    canvas.renderAll()
})

$('#police').on('change', function(){
    var text = canvas.getActiveObject();

    if (text.isEditing)
    {
        text.setSelectionStyles({
            fontFamily: $('#police').val() 
        })
    }else {
        text.setSelectionStyles({
            fontFamily: $('#police').val() 
        }, 0, text.text.length)
    }

    canvas.renderAll();
})

$('#underline').on('click', function(){
    var obj = canvas.getActiveObject();

    if (obj.underline == true)
    {
        obj.set({
            underline: false
        })    
    }else {
        obj.set({
            underline: true,
        })
    }

    canvas.renderAll();
})

$('#italic').on('click', function(){
    var obj = canvas.getActiveObject();

    if (obj.fontStyle == 'italic')
    {
        obj.set({
            fontStyle: 'normal'
        })    
    }else {
        obj.set({
            fontStyle: 'italic',
        })
    }

    canvas.renderAll();
})

$('#fontSize').on('change', function(){
    var obj = canvas.getActiveObject();

    obj.set({
        fontSize: $('#fontSize').val()
    })

    canvas.renderAll();
})

//event raccourcie 

$(document).on('keydown', function(e){

    var key = e.keyCode

    obj = canvas.getActiveObject();

    if (key == "37")
    {
        if (obj == undefined)
        {
            return;
        }

        obj.set({
            left: obj.left-1
        })

        canvas.renderAll();
    }else if (key == "38")
    {

        if (obj == undefined)
        {
            return;
        }

        obj.set({
            top: obj.top-1
        })

        canvas.renderAll();
    }else if (key == "39")
    {

        if (obj == undefined)
        {
            return;
        }

        obj.set({
            left: obj.left+1
        })

        canvas.renderAll();
    }else if (key == "40")
    {

        if (obj == undefined)
        {
            return;
        }

        obj.set({
            top: obj.top+1
        })

        canvas.renderAll();
    }

    if (key == "46")
    {
        deleteObjet()
    }
})