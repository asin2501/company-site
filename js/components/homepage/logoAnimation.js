//let $ = require('jquery');
let particles = [],
    ctx,
    templateCtx,
    isImageLoaded = false,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    TEMPLATE_CANVAS_WIDTH,
    TEMPLATE_CANVAS_HEIGHT,
    drawn,
    drawingInterval,
    tog = true,
    t,
    bounds,
    mx,
    my,
    firstFrame = true,

    RADIUS = 1, //Радиус точки
    SPACING = 8, //Растояние между точками
    THICKNESS = Math.pow(25, 2), //Радиус разлета
    DRAG = 0.8, //Скорость возврата после разлета
    EASE = 0.2,
    dispersionAnimationFrame; //Для остановки и запуска анимации разлета
//cancelAnimationFrame(dispersionAnimationFrame); для отмены анимации разлета
//для запуска анимации резлета вызвать функции startDispersion();


function Color(r, g, b, a, hex) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.hex = hex;
}

function Particle(x, y, color) {
    this.x = x;
    this.ox = x;
    this.oy = y;
    this.y = y;
    this.color = color;
    this.vx = Math.random() * CANVAS_WIDTH;
    this.vy = Math.random() * CANVAS_HEIGHT;
}


function initLogoAnimation(imageId, canvasId, templateCanvasId, canvasContainerId) {
    let $canvas = $(canvasId),
        $templateCanvas = $(templateCanvasId);

    ctx = $canvas[0].getContext("2d");
    templateCtx = $templateCanvas[0].getContext("2d");

    CANVAS_WIDTH = $canvas.width();
    CANVAS_HEIGHT = $canvas.height();

    $canvas.attr('width', CANVAS_WIDTH)
    $canvas.attr('height', CANVAS_HEIGHT)

    TEMPLATE_CANVAS_WIDTH = $templateCanvas.width();
    TEMPLATE_CANVAS_HEIGHT = $templateCanvas.height();

    $templateCanvas.attr('width', TEMPLATE_CANVAS_WIDTH)
    $templateCanvas.attr('height', TEMPLATE_CANVAS_HEIGHT)

    drawingInterval = setInterval(draw.bind(null, imageId, canvasContainerId), 30)
}


function startDispersion() {

    if (firstFrame) {

        for (let i = 0; i < particles.length; i++) {
            particles[i].vx = 0;
            particles[i].vy = 0;
        }

        firstFrame = false;
    }

    if (tog = !tog) {

        for (let i = 0; i < particles.length; i++) {

            let p = particles[i];

            let dx = mx - p.x;
            let dy = my - p.y;

            let d = dx * dx + dy * dy;

            let f = -THICKNESS / d;
            if (d < THICKNESS) {
                t = Math.atan2(dy, dx);
                p.vx += f * Math.cos(t);
                p.vy += f * Math.sin(t);
            }

            p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
            p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;

        }

    } else {

        clear();

        for (let i = 0; i < particles.length; i++) {

            let p = particles[i];

            ctx.globalAlpha = p.color.a;
            ctx.beginPath();
            ctx.fillStyle = p.color.hex;
            ctx.arc(p.x, p.y, RADIUS, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }

    }

    dispersionAnimationFrame = requestAnimationFrame(startDispersion);
}

function stopDispersion() {
    $('#canvas-container').hide();
    cancelAnimationFrame(dispersionAnimationFrame);
}

function setImage(image) {

    templateCtx.clearRect(0, 0, TEMPLATE_CANVAS_WIDTH, TEMPLATE_CANVAS_HEIGHT);

    templateCtx.drawImage(image, TEMPLATE_CANVAS_WIDTH / 2 - image.width / 2, TEMPLATE_CANVAS_HEIGHT / 2 - image.height / 2);
    let imageData = templateCtx.getImageData(0, 0, TEMPLATE_CANVAS_WIDTH, TEMPLATE_CANVAS_HEIGHT);


    //Фильтрация пикселей с пропуском SPACING
    for (let y = 0, y2 = imageData.height; y < y2; y += SPACING) {
        for (let x = 0, x2 = imageData.width; x < x2; x += SPACING) {
            if (imageData.data[(x * 4 + y * 4 * imageData.width) + 3] > 0) { //Фильтрация прозрачных пикселей

                let r = imageData.data[(x * 4 + y * 4 * imageData.width)],
                    g = imageData.data[(x * 4 + y * 4 * imageData.width) + 1],
                    b = imageData.data[(x * 4 + y * 4 * imageData.width) + 2],
                    al = imageData.data[(x * 4 + y * 4 * imageData.width) + 3];

                let color = new Color(r, g, b, al, rgb2hex('rgba(' + r + ', ' + g + ', ' + b + ', ' + al + ')'));
                let p = new Particle(x, y, color);

                particles.push(p);
            }
        }
    }
}


function draw(imageId, canvasContainerId) {

    if (!isImageLoaded) {
        isImageLoaded = loadImage(imageId);
        return;
    }

    clear();

    for (let i = 0; i < particles.length; i++) {
        drawn = true;

        let p = particles[i];

        //Условие для остановки отрисовки движения точек, когда они максимально приблизились к месту, в котором должны быть
        if ((p.x - p.vx) > SPACING / 1000 || (p.y - p.vy) > SPACING / 1000) {
            drawn = false;
        }

        //SPACING в данном случае отвечает за количество шагов между начальной и конечной точкой
        p.vx += (p.x - p.vx) / SPACING;
        p.vy += (p.y - p.vy) / SPACING;

        ctx.globalAlpha = p.color.a;
        ctx.beginPath();
        ctx.fillStyle = p.color.hex;
        ctx.arc(p.vx, p.vy, RADIUS, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

    }

    if (drawn) {

        clearInterval(drawingInterval);

        startDispersion();

        $(canvasContainerId).on('mousemove', function (e) {
            bounds = $(canvasContainerId)[0].getBoundingClientRect();
            mx = e.clientX - bounds.left;
            my = e.clientY - bounds.top;

        });
    }
}

function loadImage(imageId) {
    setImage(document.getElementById(imageId));
    return true;
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

function clear() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

module.exports = {
    startDispersion: startDispersion,
    initLogoAnimation: initLogoAnimation,
    stopDispersion: stopDispersion

};
