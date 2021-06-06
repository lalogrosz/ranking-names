const removeAccents = (str) => {
    return str && str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

const parseFirstAndLastName = (profile) => {
    if (!profile.first_name) {
        const splitted = profile.real_name.split(/ (.+)/)
        profile.first_name = splitted[0];
        profile.last_name = splitted[1];
    }
    profile.first_name = removeAccents(profile.first_name);
    profile.last_name = removeAccents(profile.last_name);
};

module.exports = {removeAccents, parseFirstAndLastName};