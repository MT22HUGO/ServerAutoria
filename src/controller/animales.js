
const { 
    findAllAnimales, 
    animalExistsById, 
    animalExistsByName, 
    modifyAnimal, 
    addAnimal, 
    removeAnimal, 
    findAnimal,
    findAnimalesByHabitat
} = require('../service/animales');

const { habitatExistsById } = require('../service/habitats');


//Obtiene la lista de todos los animales.
//Soporta filtrado opcional por nombre

const getAnimales = async (req, res) => {
    const { nombre } = req.query; 

    const animales = await findAllAnimales({ nombre }); 
    
    res.status(200).json(animales);
};


//Obtiene un animal específico por su ID único.
//Valida primero la existencia para evitar errores de búsqueda.

const getAnimal = async (req, res) => {
    const { id } = req.params;

    if (!await animalExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el animal no existe'
        });
    }

    const animal = await findAnimal(id);
    res.status(200).json(animal);
};


//Crea un nuevo registro de animal.
// Valida que el nombre sea único.
// Valida que el habitat_id sea válido si se proporciona.

const postAnimal = async (req, res) => {
    const { nombre, especie, categoria, edad, estado_salud, descripcion, imagen_url, habitat_id } = req.body;

    // Evita duplicados por nombre
    if (await animalExistsByName(nombre)) {
        return res.status(409).json({
            code: 409,
            title: 'conflict',
            message: 'ya existe un animal con ese nombre'
        });
    }

    // Integridad referencial: El hábitat debe existir en su tabla
    if (habitat_id && !await habitatExistsById(habitat_id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }

    const newAnimal = await addAnimal(
        nombre, 
        especie, 
        categoria, 
        edad, 
        estado_salud || 'Saludable',
        descripcion, 
        imagen_url, 
        habitat_id
    );
    
    res.status(201).json(newAnimal);
};


//Actualiza los datos de un animal existente.
//Requiere el ID por parámetro y los nuevos datos en el cuerpo de la petición.

const putAnimal = async (req, res) => {
    const { id } = req.params;
    
    // 1. Verificar que el animal a editar existe
    if (!await animalExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el animal no existe'
        });
    }

    const { nombre, especie, categoria, edad, estado_salud, descripcion, imagen_url, habitat_id } = req.body;

    // 2. Si se intenta cambiar el hábitat, verificar que el nuevo ID sea válido
    if (habitat_id && !await habitatExistsById(habitat_id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }

    await modifyAnimal(id, nombre, especie, categoria, edad, estado_salud, descripcion, imagen_url, habitat_id);
    res.status(204).end();
};


//Elimina un animal del sistema.

const deleteAnimal = async (req, res) => {
    const { id } = req.params;
    
    if (!await animalExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el animal no existe'
        });
    }
    
    await removeAnimal(id);
    res.status(204).end();
};


//Recupera todos los animales que pertenecen a un hábitat específico.
const getAnimalesByHabitat = async (req, res) => {
    const { id: habitat_id } = req.params;
    
    // Validación de seguridad para asegurar que el hábitat consultado existe
    if (!await habitatExistsById(habitat_id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }
    
    const animales = await findAnimalesByHabitat(habitat_id);
    res.status(200).json(animales);
};

module.exports = {
    getAnimales,
    getAnimal,
    postAnimal,
    putAnimal,
    deleteAnimal,
    getAnimalesByHabitat
};