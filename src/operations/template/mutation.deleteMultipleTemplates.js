import * as service from '../../services/service.template.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const deleteMultipleTemplates = async (_, { templateIds }, { session, token }) => {
  try {
    console.log(templateIds)
    const { data } = await service.deleteMultipleTemplates(token, templateIds);

    const deletedTemplates = data.templates;
    const templatesAssociatedDevices = data.templates_associated_devices;
    const templatesNotFound = data.templates_not_found
    
    return { deletedTemplates, templatesAssociatedDevices, templatesNotFound };
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default deleteMultipleTemplates;
