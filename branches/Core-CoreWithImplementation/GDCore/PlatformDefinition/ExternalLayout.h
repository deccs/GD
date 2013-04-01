/** \file
 *  Game Develop
 *  2008-2013 Florian Rival (Florian.Rival@gmail.com)
 */

#ifndef GDCORE_EXTERNALLAYOUT_H
#define GDCORE_EXTERNALLAYOUT_H
#include <string>
#include "GDCore/PlatformDefinition/InitialInstancesContainer.h"
namespace gd { class LayoutEditorCanvasOptions; }

namespace gd
{

class GD_CORE_API ExternalLayout
{
public:
    ExternalLayout() {};
    virtual ~ExternalLayout() {};

    /**
     * Must return a pointer to a copy of the layout.
     *
     * \note A such method is useful when the IDE must store a copy of a ExternalLayout derived class ( e.g. for Clipboard ) so as to avoid slicing
     *
     * Typical implementation example:
     * \code
     * return new MyExternalLayoutClass(*this);
     * \endcode
     */
    virtual ExternalLayout * Clone() const =0;

    /**
     * Must return the name of the external layout.
     */
    virtual const std::string & GetName() const =0;

    /**
     * Must change the name of the external layout.
     */
    virtual void SetName(const std::string & name_) =0;

    /**
     * Must return the container storing initial instances.
     */
    virtual const gd::InitialInstancesContainer & GetInitialInstances() const =0;

    /**
     * Must return the container storing initial instances.
     */
    virtual gd::InitialInstancesContainer & GetInitialInstances() =0;

    /**
     * Must return a reference to the LayoutEditorCanvasOptions object associated
     * to the external layout. ( In most implementation, it will be a member of the external layout )
     */
    virtual const gd::LayoutEditorCanvasOptions & GetAssociatedSettings() const =0;

    /**
     * Must return a reference to the LayoutEditorCanvasOptions object associated
     * to the external layout. ( In most implementation, it will be a member of the external layout )
     */
    virtual gd::LayoutEditorCanvasOptions & GetAssociatedSettings() =0;
};

}

#endif // GDCORE_EXTERNALLAYOUT_H