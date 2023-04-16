import numpy as np
from classes import ORIG_20_CLASSES

def probability2label(arProbas, nTop:int = 3):
    """ 
    # Return
        3-tuple: predicted nLabel, sLabel, fProbability
        in addition print nTop most probable labels
    """

    arTopLabels = arProbas.argsort()[-nTop:][::-1]
    arTopProbas = arProbas[arTopLabels]

    for i in range(nTop):
        sClass = ORIG_20_CLASSES[arTopLabels[i]]
        print("Top %d: [%3d] %s (confidence %.1f%%)" % \
            (i+1, arTopLabels[i], sClass, arTopProbas[i]*100.))
        
    #sClass = oClasses.dfClass.sClass[arTopLabels[0]] + " " + oClasses.dfClass.sDetail[arTopLabels[0]]
    return arTopLabels[0], ORIG_20_CLASSES[arTopLabels[0]], arTopProbas[0]