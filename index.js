// Clase Cliente
class Cliente {
    constructor(id_cliente, nombre, edad, telefono) {
        this.id_cliente = id_cliente;
        this.nombre = nombre;
        this.edad = edad;
        this.telefono = telefono;
        this.membresias = [];
    }

    agregar_membresia(membresia) {
        this.membresias.push(membresia);
    }
}

// Clase Membresia
class Membresia {
    constructor(id_membresia, tipo, costo, duracion_meses) {
        this.id_membresia = id_membresia;
        this.tipo = tipo;
        this.costo = costo;
        this.duracion_meses = duracion_meses;
        this.activa = true;
    }

    cancelar() {
        this.activa = false;
    }
}

// Clase Pago
class Pago {
    constructor(id_pago, id_cliente, monto, fecha) {
        this.id_pago = id_pago;
        this.id_cliente = id_cliente;
        this.monto = monto;
        this.fecha = fecha;
    }
}

// Clase Gimnasio
class Gimnasio {
    constructor() {
        this.clientes = [];
        this.membresias = [];
        this.pagos = [];
    }

    registrar_cliente() {
        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        const telefono = document.getElementById('telefono').value;

        if (!nombre || !edad || !telefono) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const id_cliente = this.clientes.length + 1;
        const cliente = new Cliente(id_cliente, nombre, edad, telefono);
        this.clientes.push(cliente);

        document.getElementById('nombre').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('telefono').value = '';

        alert(`Cliente ${nombre} registrado con éxito.`);
    }

    registrar_membresia() {
        const tipo = document.getElementById('tipo').value;
        const costo = document.getElementById('costo').value;
        const duracion_meses = document.getElementById('duracion').value;
        const cliente_id = document.getElementById('cliente_id').value;

        if (!tipo || !costo || !duracion_meses || !cliente_id) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const cliente = this.buscar_cliente(parseInt(cliente_id));
        if (!cliente) {
            alert(`Cliente con ID ${cliente_id} no encontrado.`);
            return;
        }

        const id_membresia = this.membresias.length + 1;
        const membresia = new Membresia(id_membresia, tipo, parseInt(costo), parseInt(duracion_meses));
        cliente.agregar_membresia(membresia);
        this.membresias.push(membresia);

        document.getElementById('tipo').value = '';
        document.getElementById('costo').value = '';
        document.getElementById('duracion').value = '';
        document.getElementById('cliente_id').value = '';

        alert(`Membresía ${tipo} registrada para el cliente ${cliente.nombre}.`);
    }

    registrar_pago() {
        const monto = document.getElementById('monto').value;
        const fecha = document.getElementById('fecha').value;
        const cliente_id_pago = document.getElementById('cliente_id_pago').value;

        if (!monto || !fecha || !cliente_id_pago) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const cliente = this.buscar_cliente(parseInt(cliente_id_pago));
        if (!cliente) {
            alert(`Cliente con ID ${cliente_id_pago} no encontrado.`);
            return;
        }

        const id_pago = this.pagos.length + 1;
        const pago = new Pago(id_pago, parseInt(cliente_id_pago), parseInt(monto), fecha);
        this.pagos.push(pago);

        document.getElementById('monto').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('cliente_id_pago').value = '';

        alert(`Pago registrado para el cliente ${cliente.nombre}.`);
    }

    buscar_cliente(id_cliente) {
        return this.clientes.find(cliente => cliente.id_cliente === id_cliente);
    }

    generar_informe() {
        const clientes_atendidos = this.clientes.length;
        const ingresos_generados = this.pagos.reduce((total, pago) => total + pago.monto, 0);
        const pagos_realizados = this.pagos.length;

        return {
            clientes_atendidos,
            ingresos_generados,
            pagos_realizados
        };
    }
}

// Instancia del Gimnasio
const gimnasio = new Gimnasio();

// Funciones para manejar los eventos del HTML
function registrarCliente() {
    gimnasio.registrar_cliente();
}

function registrarMembresia() {
    gimnasio.registrar_membresia();
}

function registrarPago() {
    gimnasio.registrar_pago();
}

function generarInforme() {
    const informe = gimnasio.generar_informe();
    const informeHTML = `
        <h2>Informe del Gimnasio</h2>
        <p>Clientes atendidos: ${informe.clientes_atendidos}</p>
        <p>Ingresos generados: $${informe.ingresos_generados}</p>
        <p>Pagos realizados: ${informe.pagos_realizados}</p>
    `;

    document.getElementById('informe').innerHTML = informeHTML;
}
