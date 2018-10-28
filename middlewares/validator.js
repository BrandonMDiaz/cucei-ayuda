// FIXME Los atributos usados para documentacion son en minusculas y de estos solo author es valido
/**
 * @Author: schwarze_falke
 * @Date:   2018-09-30T13:26:40-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-02T04:41:37-05:00
 */

// FIXME Todos los metodos deben estar documentados

class Validator {
    static get badJSON() {
        return {
            status: 400, // FIXME el status code para un input incorrecto no es 40
            response: 'Bad Request',
            message: 'There is an invalid input in the request.',
            data: null,
        };
    }

    static get regex() {
        return {
            code: /^[1-9]+[0-9]*$/,
        };
    }

    static code(data) {
        if (!Validator.regex.code.test(data)) {
            return Validator.badJSON;
        }
        return false;
    }

    static validateReq(req, res, next) {
        const test = /^\d+$/;
        try {
            if (req.body.nrc === undefined) {
                // forbiddenJSON.message = 'Invalid Nrc';
                // res.status(forbiddenJSON.status).send(forbiddenJSON);
            }
            if (test.test(req.body.nrc)) {
                if (Number(req.body.nrc) < 1) {
                    // forbiddenJSON.message = 'Invalid Nrc';
                    // res.status(forbiddenJSON.status).send(forbiddenJSON);
                } else {
                    next();
                }
            } else {
                // forbiddenJSON.message = 'Invalid Nrc';
                // res.status(forbiddenJSON.status).send(forbiddenJSON);
            }
        } catch (e) {
            console.log(`error in validate NRC ${e}`);
        }
    }
}


module.exports = Validator;
