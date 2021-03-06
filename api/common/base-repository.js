/**
 * Base repository that provides common actions for Bookshelf models.
 * @module common/base-repository
 */

import autobind from 'autobind-decorator';

@autobind
/**
 * Base repository.
 * Do not forget to add the autobind decorator when extending.
 * @class BaseRepository
 */
export default class BaseRepository {
  /**
   * Create a BaseRepository for Model.
   * @constructs BaseRepository
   * @param {Object} Model that this Repository belongs to.
   */
  constructor(Model) {
    this.Model = Model;
  }

  /**
   * Find all Models.
   * @function findAll
   * @param {Object|string} [where] Bookshelf key/operator/value or attributes hash.
   * @param {Object} [options] Bookshelf options to pass on to fetchAll.
   * @returns {Promise<Collection>} A Promise that resolves to a Collection of Models.
   */
  findAll(where = {}, options = {}) {
    return this.Model
      .where(where)
      .fetchAll(options);
  }

  /**
   * Find one Model.
   * @function findOne
   * @param {Object|string} where Bookshelf key/operator/value or attributes hash.
   * @param {Object} [options] Bookshelf options to pass on to fetch.
   * @returns {Promise<Model>} A Promise that resolves to a Model.
   */
  findOne(where, options = {}) {
    return this.Model
      .where(where)
      .fetch({
        require: true,
        ...options,
      });
  }

  /**
   * Find a Model by id.
   * @function findById
   * @param {string} id A uuid of a Model.
   * @param {Object} [options] Bookshelf options to pass on to fetch.
   * @returns {Promise<Model>} A Promise that resolves to a Model.
   */
  findById(id, options) {
    return this.findOne({ id }, options);
  }

  /**
   * Create a new Model.
   * @function create
   * @param {Object} attributes An object containing key-value attributes of the Model.
   * @param {Object} [options] Bookshelf options to pass on to save.
   * @returns {Promise<Model>} A Promise that resolves to the created Model.
   */
  create(attributes, options = {}) {
    return new this.Model(attributes)
      .save(null, options);
  }

  /**
   * Delete a Model by id.
   * @function deleteById
   * @param {string} id An object containing key-value attributes of the User.
   * @param {Object} [options] Bookshelf options to pass on to destroy.
   * @returns {Promise<Model>} A promise resolving to the destroyed
   * and thus "empty" Model.
   */
  deleteById(id, options = {}) {
    return this.findById(id)
      .then(record => record.destroy(options));
  }

  /**
   * Update a policy with specified id.
   * @function updateById
   * @param {string} id A uuid of the policy.
   * @param {Object} attributes An object containing key-value attributes of the Model.
   * @param {Object} [options] Bookshelf options to pass on to save.
   * @returns {Promise<Model>} A promise resolving to the updated Model.
   */
  updateById(id, attributes, options = {}) {
    return this.findById(id)
      .then((record) => {
        record.updateWith(attributes);
        return record.save(options);
      });
  }
}
